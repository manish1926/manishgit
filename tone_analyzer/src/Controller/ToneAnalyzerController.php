<?php

namespace Drupal\tone_analyzer\Controller;

use Drupal\Component\Utility\UrlHelper;
use Drupal\Core\Access\AccessResult;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\Core\PageCache\ResponsePolicy\KillSwitch;
use Drupal\tone_analyzer\Event\SaveBrowseURLEvent;
use Drupal\tone_analyzer\ToneAnalyzerInterface;
use Drupal\tone_analyzer\ToneAnalyzerUserInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class ToneAnalyzerController.
 */
class ToneAnalyzerController extends ControllerBase
{

  /**
   * The event_dispatcher object.
   *
   * @var \Symfony\Component\EventDispatcher\EventDispatcherInterface
   */
  protected $event_dispatcher;

  /**
   * @var \Drupal\tone_analyzer\ToneAnalyzerUserInterface
   */
  protected $user;

  /**
   * @var \Drupal\Core\PageCache\ResponsePolicy\KillSwitch
   */
  protected $killSwitch;

  /**
   * @var string
   */
  protected $PROXY_PREFIX;

  /**
   * Drupal\tone_analyzer\ToneAnalyzerInterface definition.
   *
   * @var \Drupal\tone_analyzer\ToneAnalyzerInterface
   */
  protected $toneAnalyzerTone;

  /**
   * @var \Drupal\Core\Messenger\MessengerInterface
   */
  protected $messenger;

  /**
   * ToneAnalyzerController constructor.
   *
   * @param \Drupal\tone_analyzer\ToneAnalyzerInterface                 $tone_analyzer_tone
   * @param \Symfony\Component\EventDispatcher\EventDispatcherInterface $event_dispatcher
   * @param \Drupal\Core\PageCache\ResponsePolicy\KillSwitch            $killSwitch
   * @param \Drupal\tone_analyzer\ToneAnalyzerUserInterface             $user
   * @param \Drupal\Core\Messenger\MessengerInterface                   $messenger
   */
  public function __construct(
    ToneAnalyzerInterface $tone_analyzer_tone,
    EventDispatcherInterface $event_dispatcher,
    KillSwitch $killSwitch,
    ToneAnalyzerUserInterface $user,
    MessengerInterface $messenger
  ) {
    $this->toneAnalyzerTone = $tone_analyzer_tone;
    $this->killSwitch       = $killSwitch;
    $this->event_dispatcher = $event_dispatcher;
    $this->user             = $user;
    $this->messenger        = $messenger;
    $current_path           = \Drupal::service('path.current')->getPath();
    $host                   = \Drupal::request()->getSchemeAndHttpHost();
    $this->PROXY_PREFIX     = $host.$current_path;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container)
  {
    return new static(
      $container->get('tone_analyzer.tone'),
      $container->get('event_dispatcher'),
      $container->get('page_cache_kill_switch'),
      $container->get('tone_analyzer.user'),
      $container->get('messenger')
    );
  }

  /**
   * @param \Symfony\Component\HttpFoundation\Request $request
   *
   * @return array
   */
  public function getTone(Request $request)
  {
    $this->killSwitch->trigger();

    $site = $request->query->get('site') ?: '';

    $validationStatus = $this->ValidateRequest($site);
    if ($validationStatus) {
      $this->event_dispatcher->dispatch(
        SaveBrowseURLEvent::SaveBrowseURL,
        new SaveBrowseURLEvent($site)
      );
    } else {
      return $this->redirect('<front>')->send();
    }

    return [
      '#theme'       => 'get_tone_content_display',
      '#title'       => 'Tone Analyzer',
      '#tones'       => $this->tone_analyzer_tones(),
      '#module_path' => $request->getSchemeAndHttpHost().'/'.drupal_get_path(
          'module',
          'tone_analyzer'
        ),
      '#search_url'  => $site,
    ];
  }

  /**
   * @param $website_url
   *
   * @return bool
   */
  public function ValidateRequest($website_url)
  {

    if (UrlHelper::isValid($website_url, true) === false) {
      $this->messenger->addMessage(
        $this->t('The URL is invalid. Please enter a full URL with http://.'),
        'error',
        true
      );

      return false;
    }

    $registerDomain  = $this->user->getRegisterDomain();
    $userCreatedDate = $this->user->getUserCreatedDate();
    $trialPeriod     = strtotime('+10 day', $userCreatedDate);
    $currentTime     = time();
    $domain          = parse_url($website_url);

    if (!empty($registerDomain[0]->domain)) {
      if (($registerDomain[0]->domain !== str_ireplace('www.','',$domain['host']))) {
        $this->messenger->addMessage(
          $this->t('You can use only one domain in your trial period'),
          'error',
          true
        );

        return false;
      }
    } else {
      // SAve register Domain to DB if not not found
      $this->user->saveRegisterDomain($domain['host']);
    }

    $usedCount = $this->user->getPerDayUsedCount();

    if ($usedCount >= $this->user->getPerDayLimit()) {
      $this->messenger->addMessage(
        $this->t(
          'You have consume all your daily limit.'
        ),
        'error',
        true
      );

      return false;
    }

    if ($currentTime > $trialPeriod) {
      $this->messenger->addMessage(
        $this->t(
          'Your 10 days trial is over, please upgrade plan to continue testing'
        ),
        'error',
        true
      );

      return false;
    }

    return true;
  }

  /**
   * @return array
   */
  private function tone_analyzer_tones()
  {
    $tones = [
      'anger'      => 'Anger',
      'fear'       => 'Fear',
      'joy'        => 'Joy',
      'sadness'    => 'Sadness',
      'analytical' => 'Analytical',
      'confident'  => 'Confident',
      'tentative'  => 'Tentative',
    ];

    return $tones;
  }

  /**
   * @return array
   */
  public function getRegisterDomain()
  {
    $this->killSwitch->trigger();

    $registerDomain  = $this->user->getRegisterDomain();
    $userCreatedDate = $this->user->getUserCreatedDate();
    $trialPeriod     = strtotime('+10 day', $userCreatedDate);
    $currentTime     = time();

    if ($currentTime > $trialPeriod) {
      $message = $this->t(
        'Your 10 days trial is over, please upgrade plan to continue testing<br/>'
      );
    } else {
      $dayDifference = $trialPeriod - $currentTime;
      $days          = round($dayDifference / (60 * 60 * 24));
      $message       = "Your {$days} days remaining<br/>";
    }

    return [
      '#markup' => $message.$registerDomain[0]->domain ?? $this->t(
          '<em>Register Domain not found.</em>'
        ),
    ];
  }

  /**
   * @return array
   */
  public function getBrowseHistory()
  {
    $this->killSwitch->trigger();

    $header = [
      ['data' => $this->t('Browse URL'), 'field' => 't.search_url'],
      ['data' => $this->t('Date'), 'field' => 't.search_date'],
    ];

    $result = $this->user->getBrowseHistory();

    $rows = [];
    foreach ($result as $row) {
      $rows[] = ['data' => (array)$row];
    }

    // Build the table for the nice output.
    $build = [
      '#markup' => '',
    ];

    $build['tablesort_table'] = [
      '#theme'  => 'table',
      '#header' => $header,
      '#rows'   => $rows,
    ];

    $build['pager'] = [
      '#type' => 'pager',
    ];

    return $build;
  }

  /**
   * @param \Symfony\Component\HttpFoundation\Request $request
   */
  public function fetchTone(Request $request)
  {
    ob_start("ob_gzhandler");
    $curl_url = $request->query->get('site') ?: '';

    if (empty($curl_url)) {
      die('No URL Found');
    }

    $response           = $this->toneAnalyzerTone->makeRequest($curl_url);
    $rawResponseHeaders = $response["headers"];
    $responseBody       = $response["body"];
    $responseInfo       = $response["responseInfo"];
    //print_r($responseInfo); //die();
    //cURL can make multiple requests internally (while following 302 redirects), and reports
    //headers for every request it makes. Only proxy the last set of received response headers,
    //corresponding to the final request made by cURL for any given call to makeRequest().
    $responseHeaderBlocks = array_filter(
      explode("\r\n\r\n", $rawResponseHeaders)
    );
    $lastHeaderBlock      = end($responseHeaderBlocks);
    $headerLines          = explode("\r\n", $lastHeaderBlock);
    foreach ($headerLines as $header) {
      if (stripos($header, "Content-Length") === false && stripos(
                                                            $header,
                                                            "Transfer-Encoding"
                                                          ) === false
      ) {
        header($header);
      }
    }

    $contentType = "";
    if (isset($responseInfo["content_type"])) {
      $contentType = $responseInfo["content_type"];
    }

    //print $contentType; die();
    //This is presumably a web page, so attempt to proxify the DOM.
    if (stripos($contentType, "text/html") !== false) {
      //Attempt to normalize character encoding.
      $responseBody = mb_convert_encoding(
        $responseBody,
        "HTML-ENTITIES",
        mb_detect_encoding($responseBody)
      );

      //Parse the DOM.
      $doc = new \DomDocument();
      @$doc->loadHTML($responseBody);
      $xpath = new \DOMXPath($doc);

      //Proxify any of these attributes appearing in any tag.
      $proxifyAttributes = ["href", "src"];
      foreach ($proxifyAttributes as $attrName) {
        foreach (
          $xpath->query(
            '//*[@'.$attrName.']'
          ) as $element
        ) { //For every element with the given attribute...
          $attrContent = $element->getAttribute($attrName);
          if ($attrName == "href"
              && (stripos($attrContent, "javascript:") === 0 || stripos(
                                                                  $attrContent,
                                                                  "mailto:"
                                                                ) === 0)
          ) {
            continue;
          }
          $attrContent = $this->toneAnalyzerTone->rel2abs(
            $attrContent,
            $curl_url
          );
          $element->setAttribute($attrName, $attrContent);
        }
      }

      foreach ($doc->getElementsByTagName('a') as $link) {
        $href = preg_replace('#^/#', '', $link->getAttribute('href'));
        if ((stripos($href, "javascript:") === 0 || stripos(
                                                      $href,
                                                      "mailto:"
                                                    ) === 0)
        ) {
          continue;
        }
        $href = $this->PROXY_PREFIX.'?site='.$href;
        $link->setAttribute('href', $href);
      }

      $html = $doc->saveHTML();

      $this->toneAnalyzerTone->tone_analyzer_web_proxy($html);
      exit();
    } else {
      //This isn't a web page or CSS, so serve unmodified through
      // the proxy with the correct headers (images, JavaScript, etc.)
      header("Content-Length: ".strlen($responseBody));
      echo $responseBody;
      exit();
    }

  }
}
