<?php

namespace Drupal\tone_analyzer\Event;

use Symfony\Component\EventDispatcher\Event;

class SaveBrowseURLEvent extends Event
{

  const SaveBrowseURL = 'save.browse.url';

  /**
   * @var string
   */
  protected $url;

  /**
   * SaveBrowseURLEvent constructor.
   *
   * @param $url
   */
  public function __construct($url)
  {
    $this->url    = $url;
  }

  /**
   * @return string
   */
  public function getUrl()
  {
    return $this->url;
  }
}
