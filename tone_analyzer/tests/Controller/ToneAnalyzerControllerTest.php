<?php

namespace Drupal\tone_analyzer\Tests;

use Drupal\simpletest\WebTestBase;
use Drupal\tone_analyzer\ToneAnalyzerInterface;

/**
 * Provides automated tests for the tone_analyzer module.
 */
class ToneAnalyzerControllerTest extends WebTestBase {

  /**
   * Drupal\tone_analyzer\ToneAnalyzerInterface definition.
   *
   * @var \Drupal\tone_analyzer\ToneAnalyzerInterface
   */
  protected $toneAnalyzerTone;


  /**
   * {@inheritdoc}
   */
  public static function getInfo() {
    return [
      'name' => "tone_analyzer ToneAnalyzerController's controller functionality",
      'description' => 'Test Unit for module tone_analyzer and controller ToneAnalyzerController.',
      'group' => 'Other',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function setUp() {
    parent::setUp();
  }

  /**
   * Tests tone_analyzer functionality.
   */
  public function testToneAnalyzerController() {
    // Check that the basic functions of module tone_analyzer.
    $this->assertEquals(TRUE, TRUE, 'Test Unit Generated via Drupal Console.');
  }

}
