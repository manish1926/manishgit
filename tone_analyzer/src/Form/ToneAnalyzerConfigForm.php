<?php

namespace Drupal\tone_analyzer\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class ToneAnalyzerConfigForm.
 */
class ToneAnalyzerConfigForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'tone_analyzer.toneanalyzerconfig',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'tone_analyzer_config_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('tone_analyzer.toneanalyzerconfig');
    $form['api_end_point'] = [
      '#type' => 'textfield',
      '#title' => $this->t('API End Point'),
      '#description' => $this->t('API END POINT URL'),
      '#maxlength' => 100,
      '#size' => 100,
      '#default_value' => $config->get('api_end_point'),
    ];
    $form['user_name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('User Name'),
      '#description' => $this->t('USER NAME'),
      '#maxlength' => 64,
      '#size' => 64,
      '#default_value' => $config->get('user_name'),
    ];
    $form['password'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Password'),
      '#description' => $this->t('API PASSWORD'),
      '#maxlength' => 64,
      '#size' => 64,
      '#default_value' => $config->get('password'),
    ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $this->config('tone_analyzer.toneanalyzerconfig')
      ->set('api_end_point', $form_state->getValue('api_end_point'))
      ->set('user_name', $form_state->getValue('user_name'))
      ->set('password', $form_state->getValue('password'))
      ->save();
  }

}
