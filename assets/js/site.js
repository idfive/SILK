var site = (function($) {

  var idfive = {};

  var instagramConfig = {
    get: 'user',
    userId: '1288755802',
    clientId: 'f74cfb0933924430b7013270b4fda066',
    target: 'instagram-feed',
    limit: 1,
    resolution: 'standard_resolution',
    sortBy: 'most-recent',
    template: '<li class="instagram-item"><a class="instagram-item__link" href="{{link}}"><img class="instagram-item__image" src="{{image}}" alt="{{caption}}"/><div class="instagram-item__details"><p class="instagram-item__caption">{{caption}}</p></div></a></li>'
  };

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
  };

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

    var hero = document.querySelectorAll('.hero img');

    if(document.body.contains(hero[0])) {

      for(var i = 0; i < hero.length; i++) {

        var image = hero[i].getAttribute('src');
        hero[i].parentNode.style.backgroundImage = 'url(' + image + ')';

      }

    }

  };

  idfive.slideshow = function() {

    var swiftSlide = document.querySelector('.swift-slide');

    if(document.body.contains(swiftSlide)) {

      swift({
        container: '.swift-slide',
        elements: 'li'
      });

    }

  };

  idfive.instagram = function() {

    var instagramFeed = document.querySelector('#instagram-feed');

    if(document.body.contains(instagramFeed)) {
      var feed = new Instafeed(instagramConfig);
      feed.run();
    }

  };

  idfive.twitter = function() {

    var twitterFeed = document.querySelector('#twitter-feed');

    if(document.body.contains(twitterFeed)) {
      twitterFetcher.fetch(twitterConfig);
    }

  };

  function twitterTemplate(tweets) {

    var element = document.getElementById('twitter-feed');
    var i = 0;

    while(i < tweets.length) {
      element.innerHTML += '<li class="twitter-item">' + tweets[i] + '</li>';
      i++;
    }

  }

  return idfive;

})(jQuery);

(function($){

  site.domReady();

})(jQuery);
