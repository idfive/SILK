var site = (function($) {

  var idfive = {};

  idfive.domReady = function() {
    idfive.hero();
    idfive.another();
  };

  idfive.hero = function() {

    $('.hero').each(function() {

      var image = $(this).find('img').attr('src');
      $(this).css('background-image', 'url(' + image + ')');

    });

  };

  idfive.another = function() {

  };

  return idfive;

})(jQuery);

(function($){

  site.domReady();

})(jQuery);
