<?php

namespace Drupal\tone_analyzer;

use Drupal\Core\Database\Connection;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\Core\Routing\UrlGeneratorTrait;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Class ToneAnalyzerUserService.
 */
class ToneAnalyzerUserService implements ToneAnalyzerUserInterface
{
    use UrlGeneratorTrait;
    use StringTranslationTrait;

  /**
   * per day limit
   */
    const perDayLimit = 10;

  /**
   * @var \Drupal\Core\Session\AccountProxyInterface
   */
    protected $account;

  /**
   * @var \Drupal\Core\Database\Connection
   */
    protected $database;

  /**
   * @var \Drupal\tone_analyzer\MessengerInterface
   */
    protected $messenger;

  /**
   * ToneAnalyzerUserService constructor.
   *
   * @param \Drupal\Core\Database\Connection           $connection
   * @param \Drupal\Core\Session\AccountProxyInterface $account
   * @param \Drupal\Core\Messenger\MessengerInterface  $messenger
   */
    public function __construct(
        Connection $connection,
        AccountProxyInterface $account,
        MessengerInterface $messenger
    ) {
        $this->database  = $connection;
        $this->account   = $account;
        $this->messenger = $messenger;
    }

  /**
   * @return mixed
   */
    public function getRegisterDomain()
    {
        $result = $this->database->select(
            'tone_analyzer_user_domain_mapping',
            'taudm'
        )->fields('taudm', ['uid', 'domain'])
                             ->condition('uid', $this->account->id())
                             ->execute()->fetchAll(\PDO::FETCH_OBJ);

        return $result;
    }

  /**
   * @return mixed
   */
    public function getUserCreatedDate()
    {
        return $this->account->getAccount()->created;
    }

  /**
   * @param $domain
   */
    public function saveRegisterDomain($domain)
    {
        try {
            if (!empty($domain)) {
                $this->database->insert('tone_analyzer_user_domain_mapping')
                       ->fields(
                           [
                           'uid'       => $this->account->id(),
                           'domain'    => str_ireplace('www.', '', $domain),
                           'is_bypass' => 0,
                           ]
                       )->execute();
            }
        } catch (\Exception $e) {
            $this->redirect('<front>')->send();
        }
    }

  /**
   * @param $url
   */
    public function saveSearchHistory($url)
    {
        try {
            if (!empty($url)) {
                $this->database->insert('tone_analyzer_search_tone_history')
                       ->fields(
                           [
                           'uid'        => $this->account->id(),
                           'search_url' => $url,
                           ]
                       )->execute();
            }
        } catch (\Exception $e) {
            $this->redirect('<front>')->send();
        }
    }

  /**
   * @return mixed
   */
    public function getPerDayUsedCount()
    {
        $current_time = date('Y-m-d');
        $result       = $this->database->select(
            'tone_analyzer_search_tone_history',
            'tasth'
        )->fields('tasth', ['uid', 'search_date'])
                                   ->where(
                                       'DATE(search_date) = :search_date',
                                       [':search_date' => $current_time]
                                   )
                                   ->condition('uid', $this->account->id())
                                   ->countQuery()->execute()->fetchField();

        return $result;
    }

  /**
   * @return int
   */
    public function getPerDayLimit()
    {
        return self::perDayLimit;
    }

  /**
   * @return mixed
   */
    public function getBrowseHistory()
    {
        $header = [
        ['data' => $this->t('Browse URL'), 'field' => 't.search_url'],
        ['data' => $this->t('Date'), 'field' => 't.search_date'],
        ];

        $query = $this->database
        ->select('tone_analyzer_search_tone_history', 't')
        ->fields('t', ['search_url', 'search_date'])
        ->extend('Drupal\Core\Database\Query\TableSortExtender');
        $query->condition('uid', $this->account->id())
        ->orderBy('search_date', 'DESC');

      // Don't forget to tell the query object how to find the header information.
        $table_sort = $query->orderByHeader($header);
        $pager = $table_sort->extend('Drupal\Core\Database\Query\PagerSelectExtender')
                        ->limit(10);
        $result = $pager->execute();

        return $result;
    }
}
