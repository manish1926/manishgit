<?php

namespace Drupal\tone_analyzer\Form;

use Drupal\Component\Utility\UrlHelper;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\tone_analyzer\ToneAnalyzerUserInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class ToneAnalyzerForm.
 */
class ToneAnalyzerForm extends FormBase
{

  /**
   * @var ToneAnalyzerUserInterface $account
   */
  protected $user;

  /**
   * ToneAnalyzerForm constructor.
   *
   * @param \Drupal\tone_analyzer\ToneAnalyzerUserInterface $user
   */
  public function __construct(ToneAnalyzerUserInterface $user)
  {
    $this->user = $user;
  }

  public static function create(ContainerInterface $container)
  {
    return new static(
      $container->get('tone_analyzer.user')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId()
  {
    return 'tone_analyzer_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state)
  {

    $form['website_url']                   = [
      '#type'       => 'textfield',
      '#title'      => $this->t('Website Url'),
      '#maxlength'  => 64,
      '#size'       => 64,
      '#attributes' => [
        'placeholder' => $this->t('Enter a valid URL'),
      ],
    ];
    $form['website_url']['#title_display'] = 'invisible';

    $form['submit'] = [
      '#type'  => 'submit',
      '#value' => $this->t('Submit'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state)
  {
    if (UrlHelper::isValid(
        $form_state->getValue('website_url'),
        true
      ) === false
    ) {
      $form_state->setErrorByName(
        'website_url',
        $this->t('The URL is invalid. Please enter a full URL with http://.')
      );
    }

    $registerDomain  = $this->user->getRegisterDomain();
    $userCreatedDate = $this->user->getUserCreatedDate();
    $trialPeriod     = strtotime('+10 day', $userCreatedDate);
    $currentTime     = time();
    $domain          = parse_url($form_state->getValue('website_url'));

    if (!empty($registerDomain)
        && ($registerDomain[0]->domain !== str_ireplace('www.','',$domain['host']))
    ) {
      $form_state->setErrorByName(
        'website_url',
        $this->t('You can use only one domain in your trial period')
      );
    }

    $usedCount = $this->user->getPerDayUsedCount();

    if ($usedCount >= $this->user->getPerDayLimit()) {
      $form_state->setErrorByName(
        'website_url',
        $this->t('You have consume all your daily limit.')
      );
    }

    if ($currentTime > $trialPeriod) {
      $form_state->setErrorByName(
        'website_url',
        $this->t(
          'Your 10 days trial is over, please upgrade plan to continue testing'
        )
      );
    }

    parent::validateForm($form, $form_state);

  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state)
  {
    $form_state->setRedirect(
      'tone_analyzer.tone_analyzer_controller_tone',
      [],
      ['query' => ['site' => $form_state->getValue('website_url')]]
    );

    return;
  }

}
