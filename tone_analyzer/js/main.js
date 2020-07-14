$ = jQuery;
$(document).ready(function () {
  var tones = {
    'anger': 'Anger',
    'fear': 'Fear',
    'joy': 'Joy',
    'sadness': 'Sadness',
    'analytical': 'analytical',
    'confident': 'Confident',
    'tentative': 'Tentative'
  };
  var tones_count = {};
  var emotiClass = "icon-emoti emoti-";

  function replaceParameter(path) {
    /*
     * queryParameters -> handles the query string parameters
     * queryString -> the query string without the fist '?' character
     * re -> the regular expression
     * m -> holds the string matching the regular expression
     */
    var queryParameters = {}, queryString = location.search.substring(1),
      re = /([^&=]+)=([^&]*)/g, m;

// Creates a map with the query string parameters
    while (m = re.exec(queryString)) {
      queryParameters[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

// Add new parameters or update existing ones
    queryParameters['site'] = path;

    /*
     * Replace the query portion of the URL.
     * jQuery.param() -> create a serialized representation of an array or
     *     object, suitable for use in a URL query string or Ajax request.
     */
    location.search = $.param(queryParameters); // Causes page to reload
  }

  $('.ta-sideBar #tone-input-submit').on("click", function () {
    replaceParameter($('#tone-input').val());
  });

  $('.ta-sideBar .ta-tab-nav li a').on("click", function (event) {
    event.preventDefault();
    $('.ta-sideBar .ta-tab-nav li a').removeClass('active');
    $(this).addClass('active');
    $(".ta-sideBar .ta-tabs .ta-tab-blocks").hide();
    console.log(".ta-sideBar .ta-tabs " + $(this).attr("tab"));
    $(".ta-sideBar .ta-tabs " + $(this).attr("tab")).show();
  });

  $('#tone-iframe').on('load', function(){
    var iframe = $('#tone-iframe').contents();

    iframe.find('a').on('click', function (e) {
      e.preventDefault();
      var full_url = $(this).prop("href");
      var query = "?site=";
      var url = full_url.substr(full_url.indexOf(query) + query.length);
      replaceParameter(url);
    });

    for (var tone in tones) {
      if (tones.hasOwnProperty(tone)) {
        var emoti = '<div class="emoti-wrapper-' + tone + '"></div>';
        var count = iframe.find('.hovered-element .ToolTip_text .' + tone);
        var tab2 = '.ta-sideBar .ta-tabs #tabs-2';
        tones_count[tone] = count.length;
        $('.ta-sideBar .ta-colors .' + tone + '-wrap .tone_count').html(count.length);
        if (count.length > 0) {
          var wrap = '';
          counts = count.length;
          wrap += '<div class="emoti-wrapper-' + tone + '"><label>' + tones[tone] + '</label>';
          /* $.each(count, function (key, value) {
           wrap += '<span class="' + emotiClass + tone + '">' + tone + '</span>';
           }); */
          for (var i = 1; i <= counts; i++) {
            wrap += '<span class="' + emotiClass + tone + '">' + i + '</span>';
          }
          wrap += '</div>';
          $(tab2).append(wrap);
        }
      }
    }

    $('.ta-tabs .icon-emoti').on("click", function (event) {
      var toneIndex = $(this).index() - 1;
      var toneClass = $(this).attr("class");
      var typeTone = toneClass.replace(emotiClass, '');
      var searchedEmotions = iframe.find('.hovered-element .' + typeTone);
      var selectElement = $(searchedEmotions[toneIndex]).closest('.hovered-element');
      var Offset = $(selectElement).offset().top;
      console.log(Offset);
      iframe.find('.hovered-element').removeClass('text-selected');
      $(selectElement).addClass('text-selected');
      iframe.children().animate({scrollTop: Offset - 400}, 1000);
    });

    $('.ta-tabs ul.ta-colors li').on("click", function (event) {
      var toneClass = $(this).attr("class");
      var typeTone = toneClass.replace('-wrap', '');
      $('.ta-sideBar .ta-tab-nav li a').removeClass('active');
      $('.ta-sideBar .ta-tab-nav .ta-detail').addClass('active');
      $(".ta-sideBar .ta-tabs .ta-tab-blocks").hide();
      $(".ta-sideBar .ta-tabs #tabs-2").show();
      setTimeout(function () {
        var typeOffset = $('#tabs-2 .emoti-wrapper-' + typeTone).offset().top - $('#tabs-2').offset().top;
        console.log(typeOffset);
        console.log($('#tabs-2').scrollTop());
        $('#tabs-2').animate({scrollTop: typeOffset - 50}, 500);
      }, 500);

    });
  });
});

jQuery(window).load(function() {
  jQuery("#se-pre-con").fadeOut("slow");
});
