var site = (function($) {

  var idfive = {};

  idfive.domReady = function() {
    idfive.readySilk();
    idfive.hero();
    idfive.slideshow();
  };

  idfive.readySilk = function() {

    $('.silk-accordion').silkaccordion();
    $('.silk-nav').silknav();
    $('.silk-table').silktable();
    $('.silk-tabs').silktabs();

  }

  idfive.hero = function() {

    if($('.hero').length) {

      $('.hero').each(function() {

        var image = $(this).find('img').attr('src');
        $(this).css('background-image', 'url(' + image + ')');

      });

    }

  };

  idfive.slideshow = function() {

    if($('.swift-slide').length) {

      swift({
        container: '.swift-slide',
        elements: 'li'
      });

    }

  };

  return idfive;

})(jQuery);

(function($){

  site.domReady();

})(jQuery);
