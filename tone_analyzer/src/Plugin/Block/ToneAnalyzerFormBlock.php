<?php

namespace Drupal\tone_analyzer\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a 'ToneAnalyzerFormBlock' block.
 *
 * @Block(
 *  id = "tone_analyzer_form_block",
 *  admin_label = @Translation("Tone analyzer form block"),
 * )
 */
class ToneAnalyzerFormBlock extends BlockBase {
	
  public function defaultConfiguration() {
    return [
      'token_analyzer_content_block' => $this->t('A default value. This block was created at %time', ['%time' => date('c')]),
    ];
  }

  public function blockForm($form, FormStateInterface $form_state) {
    $form['token_analyzer_content_block'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Block contents'),
      '#description' => $this->t('This text will appear in the example block.'),
      '#default_value' => $this->configuration['token_analyzer_content_block'],
    ];
    return $form;
  }

  public function blockSubmit($form, FormStateInterface $form_state) {
    $this->configuration['token_analyzer_content_block']
      = $form_state->getValue('token_analyzer_content_block');
  }  

  /**
   * {@inheritdoc}
   */
  public function build() {

    $output = [
      'description' => [
        '#markup' => $this->configuration['token_analyzer_content_block'],
      ],
    ];

    $output['form'] = \Drupal::formBuilder()->getForm('Drupal\tone_analyzer\Form\ToneAnalyzerForm');

    return $output;
  }

}
