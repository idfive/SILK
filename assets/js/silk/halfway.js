function halfway(parameters) {

  var windowHeight = window.innerHeight;
  var elements = document.querySelectorAll(parameters.element);
  var elementHitBoxes = [];
  var scrollTimeout;

  if(document.body.contains(elements[0])) {

    document.addEventListener('scroll', calculateHalfway, false);

  }

  function calculateHalfway() {

    for(var i = 0; i < elements.length; i++) {

      elementHitBoxes[i] = elements[i].getBoundingClientRect();

      if(elementHitBoxes[i].top <= windowHeight / 2 && elementHitBoxes[i].bottom >= windowHeight / 2) {

        if(!(elements[i].classList.contains('element-halfway'))) {
          elements[i].classList.add('element-halfway');
          document.body.classList.add('halfway-lock');
          scrollTimeout = window.setTimeout(unlockScroll, 400);
        }

      }

    }

  }

  function unlockScroll() {

    document.body.classList.remove('halfway-lock');

  }

}
