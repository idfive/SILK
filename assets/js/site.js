var site = (function($) {

  var idfive = {};

  idfive.domReady = function() {
    idfive.readySilk();
    idfive.hero();
    idfive.slideshow();
    idfive.instagram();
    idfive.twitter();
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

  idfive.instagram = function() {

    var feed = new Instafeed({
      get: 'user',
      userId: '31863373',
      clientId: '00dbf1c65fd84dd38fa9b69417654cd8',
      accessToken: '31863373.00dbf1c.9febb535908b473ab6eacaae13a1f230',
      target: 'instagram-feed',
      limit: 1,
      resolution: 'standard_resolution',
      sortBy: 'most-recent',
      template: '<li class="instagram-item"><a class="instagram-item__link" href="{{link}}"><img class="instagram-item__image" src="{{image}}" /><div class="instagram-item__details"><p class="instagram-item__caption">{{caption}}</p></div></a></li>'
    });

    feed.run();

  }

  idfive.twitter = function() {

    var twitterConfig = {
      id: '347099293930377217',
      domId: 'twitter-feed',
      maxTweets: 1,
      enableLinks: true,
      showInteraction: false,
      showUser: false,
      showTime: false,
      lang: 'en',
      customCallback: twitterTemplate,
    }

    function twitterTemplate(tweets) {

      var element = document.getElementById('twitter-feed');
      var i = 0;

      while(i < tweets.length) {
        element.innerHTML += '<li class="twitter-item">' + tweets[i] + '</li>';
        i++;
      }

    }

    twitterFetcher.fetch(twitterConfig);

  }

  return idfive;

})(jQuery);

(function($){

  site.domReady();

})(jQuery);
