function hero() {

  var hero = document.querySelectorAll('.hero > img');

  if(document.body.contains(hero[0])) {

    for(var i = 0; i < hero.length; i++) {

      var image = hero[i].getAttribute('src');
      hero[i].parentNode.style.backgroundImage = 'url(' + image + ')';

    }

  }

}
