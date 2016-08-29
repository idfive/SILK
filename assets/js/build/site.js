/* ========================================
// Social Configurations
// ===================================== */

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


/* ========================================
// Site Functions
// ===================================== */

init();

function init() {

  silkNav();
  hero();
  harmonicas();
  silkModal();
  slideshows();
  triggers();
  twitter();

}

function harmonicas() {

  harmonica({
    container: '.silk-harmonica--condensed',
    header: '.silk-harmonica__header'
  });

  harmonica({
    container: '.silk-harmonica--expanded',
    header: '.silk-harmonica__header'
  });

}

function slideshows() {

  var swiftSlide = document.querySelectorAll('.swift-slide');

  if(document.body.contains(swiftSlide[0])) {

    for(var i = 0; i < swiftSlide.length; i++) {
      swiftSlide[i].classList.add('swift-slide-' + i);

      swift({
        container: '.swift-slide-' + i,
        elements: 'li',
        prevSymbol: 'chevron-left',
        nextSymbol: 'chevron-right'
      });

    }

  }

}

function triggers() {

  triggerParent({
    trigger: '.site-search__trigger'
  });

}

function halfways() {

  halfway({
    element: '.halfway-section'
  });

}

function twitter() {

  var twitterFeed = document.querySelector('#twitter-feed');

  if(document.body.contains(twitterFeed)) {
    twitterFetcher.fetch(twitterConfig);
  }

}

function twitterTemplate(tweets) {

  var element = document.getElementById('twitter-feed');
  var i = 0;

  while(i < tweets.length) {
    element.innerHTML += '<li class="twitter-item">' + tweets[i] + '</li>';
    i++;
  }

}
