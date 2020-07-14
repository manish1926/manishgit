<?php

namespace Drupal\tone_analyzer\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Drupal\tone_analyzer\Event\SaveBrowseURLEvent;
use Drupal\tone_analyzer\ToneAnalyzerUserInterface;

/**
 * Class SaveBrowseUrlSubscriber.
 */
class SaveBrowseUrlSubscriber implements EventSubscriberInterface
{

  protected $user;
  /**
   * SaveBrowseUrlSubscriber constructor.
   *
   * @param \Drupal\tone_analyzer\ToneAnalyzerUserInterface $user
   */
  public function __construct(ToneAnalyzerUserInterface $user)
  {
    $this->user = $user;
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents()
  {
    $events[SaveBrowseURLEvent::SaveBrowseURL] = ['saveBrowseURL'];

    return $events;
  }

  /**
   * @param \Drupal\tone_analyzer\Event\SaveBrowseURLEvent $event
   */
  public function saveBrowseURL(SaveBrowseURLEvent $event)
  {
    $this->user->saveSearchHistory($event->getUrl());
  }

}
