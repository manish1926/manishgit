<?php

namespace Drupal\tone_analyzer;

/**
 * Interface ToneAnalyzerUserInterface.
 */
interface ToneAnalyzerUserInterface
{
  public function getRegisterDomain();

  public function saveRegisterDomain($domain);

  public function getUserCreatedDate();

  public function saveSearchHistory($url);

  public function getPerDayUsedCount();

  public function getPerDayLimit();

  public function getBrowseHistory();
}
