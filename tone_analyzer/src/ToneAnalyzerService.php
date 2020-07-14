<?php

namespace Drupal\tone_analyzer;

use Drupal\Core\Config\ConfigFactory;
use GuzzleHttp\ClientInterface;
use \GuzzleHttp\Exception\RequestException;

/**
 * Class ToneAnalyzerService.
 */
class ToneAnalyzerService implements ToneAnalyzerInterface
{

  /**
   * GuzzleHttp\ClientInterface definition.
   *
   * @var \GuzzleHttp\ClientInterface
   */
  protected $httpClient;

  /**
   * @var \Drupal\Core\Config\Config|\Drupal\Core\Config\ImmutableConfig
   */
  protected $apiEndPoint;

  /**
   * @var \Drupal\Core\Config\Config|\Drupal\Core\Config\ImmutableConfig
   */
  protected $apiUserName;

  /**
   * @var \Drupal\Core\Config\Config|\Drupal\Core\Config\ImmutableConfig
   */
  protected $apiPassword;

  /**
   * @var string
   */
  protected $host;

  /**
   * @var
   */
  protected $current_path;

  /**
   * @var string
   */
  protected $full_path;

  /**
   * @var
   */
  protected $module_path;

  /**
   * ToneAnalyzerService constructor.
   *
   * @param ClientInterface $http_client
   * @param ConfigFactory   $config_factory
   * @param                 $config
   */
  public function __construct(ClientInterface $http_client, ConfigFactory $config_factory, $config)
  {
    $this->httpClient   = $http_client;
    $config             = $config_factory->get('tone_analyzer.toneanalyzerconfig');
    $this->apiEndPoint  = $config->get('api_end_point');
    $this->apiUserName  = $config->get('user_name');
    $this->apiPassword  = $config->get('password');
    $this->current_path = \Drupal::service('path.current')->getPath();
    $this->host         = \Drupal::request()->getSchemeAndHttpHost();
    $this->full_path    = $this->host.$this->current_path;
    $this->module_path  = $this->host.'/'.drupal_get_path('module', 'tone_analyzer');
  }

  /**
   * Makes an HTTP request via cURL, using request data that was passed directly to this script.
   *
   * @param $url
   *
   * @return array
   */
  public function makeRequest($url)
  {

    //Tell cURL to make the request using the brower's user-agent if there is one, or a fallback user-agent otherwise.
    $user_agent = $_SERVER["HTTP_USER_AGENT"];
    if (empty($user_agent)) {
      $user_agent = "Mozilla/5.0 (compatible; nrird.xyz/proxy)";
    }
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_USERAGENT, $user_agent);

    //Proxy the browser's request headers.
    $browserRequestHeaders = getallheaders();
    //(...but let cURL set some of these headers on its own.)
    //TODO: The unset()s below assume that browsers' request headers
    //will use casing (capitalizations) that appear within them.
    unset($browserRequestHeaders["Host"]);
    unset($browserRequestHeaders["Content-Length"]);
    //Throw away the browser's Accept-Encoding header if any;
    //let cURL make the request using gzip if possible.
    unset($browserRequestHeaders["Accept-Encoding"]);
    curl_setopt($ch, CURLOPT_ENCODING, "");
    //Transform the associative array from getallheaders() into an
    //indexed array of header strings to be passed to cURL.
    $curlRequestHeaders = [];
    foreach ($browserRequestHeaders as $name => $value) {
      $curlRequestHeaders[] = $name.": ".$value;
    }
    curl_setopt($ch, CURLOPT_HTTPHEADER, $curlRequestHeaders);

    //Proxy any received GET/POST/PUT data.
    switch ($_SERVER["REQUEST_METHOD"]) {
      case "GET":
        /*$getData = [];
        foreach ($_GET as $key => $value) {
          $getData[] = urlencode($key)."=".urlencode($value);
        }
        if (count($getData) > 0) {
          //Remove any GET data from the URL, and re-add what was read.
          //TODO: Is the code in this "GET" case necessary?
          //It reads, strips, then re-adds all GET data; this may be a no-op.
          $url = substr($url, 0, strrpos($url, "?"));
          $url .= "?".implode("&", $getData);
        }*/
        break;
      case "POST":
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents("php://input"));
        break;
      case "PUT":
        curl_setopt($ch, CURLOPT_PUT, true);
        curl_setopt($ch, CURLOPT_INFILE, fopen("php://input"));
        break;
    }

    //Other cURL options.
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FAILONERROR, true);

    //Set the request URL.
    curl_setopt($ch, CURLOPT_URL, $url);

    //Make the request.
    $response     = curl_exec($ch);
    $responseInfo = curl_getinfo($ch);
    $headerSize   = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    curl_close($ch);

    //Setting CURLOPT_HEADER to true above forces the response headers and body
    //to be output together--separate them.
    $responseHeaders = substr($response, 0, $headerSize);
    $responseBody    = substr($response, $headerSize);

    return ["headers" => $responseHeaders, "body" => $responseBody, "responseInfo" => $responseInfo];
  }

  /**
   * Converts relative URLs to absolute ones, given a base URL.
   * Modified version of code found at http://nashruddin.com/PHP_Script_for_Converting_Relative_to_Absolute_URL
   *
   * @param $rel
   * @param $base
   *
   * @return string
   */
  public function rel2abs($rel, $base)
  {
    if (empty($rel)) {
      $rel = ".";
    }
    if (parse_url($rel, PHP_URL_SCHEME) != "" || strpos($rel, "//") === 0) {
      return $rel;
    } //Return if already an absolute URL
    if ($rel[0] == "#" || $rel[0] == "?") {
      return $base.$rel;
    } //Queries and anchors
    extract(parse_url($base)); //Parse base URL and convert to local variables: $scheme, $host, $path
    $path = isset($path) ? preg_replace('#/[^/]*$#', "", $path) : "/"; //Remove non-directory element from path
    if ($rel[0] == '/') {
      $path = "";
    } //Destroy path if relative url points to root
    $port = isset($port) && $port != 80 ? ":".$port : "";
    $auth = "";
    if (isset($user)) {
      $auth = $user;
      if (isset($pass)) {
        $auth .= ":".$pass;
      }
      $auth .= "@";
    }
    $abs = "$auth$host$path$port/$rel"; //Dirty absolute URL
    for ($n = 1; $n > 0; $abs = preg_replace(["#(/\.?/)#", "#/(?!\.\.)[^/]+/\.\./#"], "/", $abs, -1, $n)) {
    } //Replace '//' or '/./' or '/foo/../' with '/'
    return $scheme."://".$abs; //Absolute URL is ready.
  }

  /**
   *
   * @param $url
   */
  public function recordLog($url)
  {
    $userip  = $_SERVER['REMOTE_ADDR'];
    $rdate   = date("d-m-Y", time());
    $data    = $rdate.','.$userip.','.$url.PHP_EOL;
    $logfile = 'logs/'.$userip.'_log.txt';
    $fp      = fopen($logfile, 'a');
    fwrite($fp, $data);
  }

  public function tone_analyzer_web_proxy($htmlResponse)
  {
    $module_path = drupal_get_path('module', 'tone_analyzer');
    $image_path  = $module_path.'/images/';
    $min_length  = 2;

    $content = $htmlResponse;

    // Create a DOM object.
    $html_obj = new \simple_html_dom();

    // Load HTML from a string.
    $html_obj->load($content);

    $data_text = [];
    foreach ($html_obj->find('body') as $a) {
      foreach ($a->find('text') as $b) {
        if ( ! empty(trim($b->plaintext))) {
          $data_text[] = trim(strip_tags($b->plaintext));
        }
      }
    }

    $par      = implode("\n", $data_text);
    $css_path = $this->module_path.'/css/proxy.css';
    $css      = '<link rel="stylesheet" type="text/css" href="'.$css_path.'">';
    $content  = str_replace('</body>', $css.'</body>', $content);
    $doc_tone = $this->tone_analyzer_fetch_data(json_encode(['text' => $par]));
    $doc_tone = json_decode($doc_tone);
    if (isset($doc_tone->sentences_tone)) {
      foreach (array_reverse($doc_tone->sentences_tone) as $end_text) {
        $end_text  = $end_text->text;
        $pos       = array_search($end_text, $data_text);
        $last_text = count($data_text) - 1;
        if ($pos > 0) {
          if ($pos >= $last_text) {
            break;
          }

          $remaining_items = array_slice($data_text, $pos);
          $remaining_items = implode("\n", $remaining_items);
          $remaining_tone  = $this->tone_analyzer_fetch_data(json_encode(['text' => $remaining_items]));
          $remaining_tone  = json_decode($remaining_tone);

          if (isset($remaining_tone->sentences_tone)) {
            $doc_tone->sentences_tone = array_merge($doc_tone->sentences_tone, $remaining_tone->sentences_tone);
          }
          break;
        }
      }
    }
    $pos            = strpos($content, '<body');
    $str1           = substr($content, 0, $pos);
    $str2           = substr($content, $pos);
    $processed_text = [];

    if (isset($doc_tone->sentences_tone)) {
      foreach ($doc_tone->sentences_tone as $seq) {
        if (in_array($seq->text, $processed_text) || (str_word_count($seq->text) <= $min_length)) {
          continue;
        }
        $refr    = true;
        $str_pos = 0;
        $text    = $seq->text;
        if ( ! empty($seq->tones)) {
          $info_icons       = '';
          $processed_text[] = $text;
          if (count($seq->tones) >= 1) {
            $text = '<span class="hovered-element"><span class="ToolTip_wrapper"><span class="ToolTip_text">';
          }
          foreach ($seq->tones as $tone) {
            $text .= '<span>';
            $text .= '<label class="score">'.$tone->score.'</label>';
            $text .= '<label class="'.$tone->tone_id.'">'.$tone->tone_name.'</label>';
            $text .= '</span>';
            $info_icons .= '<span class="info-icon info-'.$tone->tone_id.'"></span>';
          }
          if (count($seq->tones) >= 1) {
            $text .= '</span><span class="ToolTip_arrow"></span></span><span class="main-text">'.$seq->text.'</span></span>';
            $text .= $info_icons;
          }
          while ($refr) {
            $refr    = false;
            $str_pos = strpos($str2, $seq->text, $str_pos);
            if ($str_pos) {
              $str2    = $this->tone_analyzer_replace_text($seq->text, $text, $str2, $str_pos);
              $str_pos = $str_pos + strlen($text);
              if (strpos($str2, $seq->text, $str_pos)) {
                $refr = true;
              }
            }
          }
        } else {
          $processed_text[] = $text;
          $seq_text         = $text;
          $text             = '<span class="hovered-element no-tone"><span class="ToolTip_wrapper"><span class="ToolTip_text">';
          $text .= '<span>';
          $text .= '<label class="no-tone">'.t('No Tone').'</label>';
          $text .= '</span>';
          $text .= '</span><span class="ToolTip_arrow"></span></span>'.$seq_text.'</span>';
          $text .= '<span class="cancel-icon"></span>';
          while ($refr) {
            $refr    = false;
            $str_pos = strpos($str2, $seq->text, $str_pos);
            if ($str_pos) {
              $str2    = $this->tone_analyzer_replace_text($seq->text, $text, $str2, $str_pos);
              $str_pos = $str_pos + strlen($text);
              if (strpos($str2, $seq->text, $str_pos)) {
                $refr = true;
              }
            }
          }
        }
      }
    }
    echo $str1.$str2;
    // Release resources to avoid memory leak in some versions.
    $html_obj->clear();
    die;
  }

  protected function tone_analyzer_replace_text($from, $to, $content, $pos) {
    if ((strpos($content, '>', $pos)) >= (strpos($content, '<', $pos))) {
      $content = substr_replace($content, $to, $pos, strlen($from));
    }
    return $content;

  }
  /**
   * @param $text
   *
   * @return mixed
   */
  function tone_analyzer_fetch_data($text)
  {
    $credentials = [
      'username' => $this->apiUserName,
      'password' => $this->apiPassword,
    ];


    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $this->apiEndPoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $text);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_USERPWD, $credentials['username'].":".$credentials['password']);

    $headers   = [];
    $headers[] = "Content-Type: application/json";
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
      echo 'Error:'.curl_error($ch);
    }
    curl_close($ch);

    return $result;
  }

  /**
   * Throttle response.
   *
   * 100 per 60s allowed.
   */
  private function throttle($headers)
  {
    print_r($headers['X-PCO-API-Request-Rate-Count'][0]);
    if ($headers['X-PCO-API-Request-Rate-Count'][0] > 99) {
      return sleep(60);
    }

    return true;
  }

}
