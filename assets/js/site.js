var site = (function($) {

  var idfive = {};

  idfive.domReady = function() {
    idfive.hero();
    idfive.slideshow();
  };

  idfive.hero = function() {

    if($('.hero').length) {

      $('.hero').each(function() {

        var image = $(this).find('img').attr('src');
        $(this).css('background-image', 'url(' + image + ')');

      });

    }

  };

  idfive.slideshow = function() {

    swift({
      container: '.swift-slide',
      elements: 'li'
    });

  };

  return idfive;

})(jQuery);

(function($){

  site.domReady();

})(jQuery);
