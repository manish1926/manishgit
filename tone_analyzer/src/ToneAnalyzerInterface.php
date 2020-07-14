<?php

namespace Drupal\tone_analyzer;

/**
 * Interface ToneAnalyzerInterface.
 */
interface ToneAnalyzerInterface
{
  public function makeRequest($url);

  public function rel2abs($rel, $base);

  public function recordLog($url);

  public function tone_analyzer_web_proxy($htmlResponse);
}
