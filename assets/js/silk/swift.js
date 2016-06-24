function swift(parameters) {

  var container = document.querySelector(parameters.container);
  var elements = document.querySelectorAll(parameters.container + ' ' + parameters.elements);

  container.addEventListener('touchstart', handleTouchStart, false);
  container.addEventListener('touchmove', handleTouchMove, false);

  var xDown = null;
  var yDown = null;

  function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
  };

  function handleTouchMove(evt) {

    if ( ! xDown || ! yDown ) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {

      if ( xDiff > 0 ) {
        nextSlide();
      } else {
        previousSlide();
      }

    }

    /* reset values */
    xDown = null;
    yDown = null;

  };
  
  if(container.length) {

    var controller = document.createElement('div');
    controller.classList.add('swift-controls');
    container.appendChild(controller);

    var prev = document.createElement('button');
    prev.addEventListener('click', previousSlide, false);
    prev.classList.add('swift-control', 'swift-prev');
    prev.innerHTML = '<svg class="symbol symbol-' + parameters.prevSymbol + '"><use xlink:href="#' + parameters.prevSymbol + '"></use></svg>';
    controller.appendChild(prev);

    var next = document.createElement('button');
    next.addEventListener('click', nextSlide, false);
    next.classList.add('swift-control', 'swift-next');
    next.innerHTML = '<svg class="symbol symbol-' + parameters.nextSymbol + '"><use xlink:href="#' + parameters.nextSymbol + '"></use></svg>';
    controller.appendChild(next);

    var currentSlide = 0;

    var pager = document.createElement('div');
    pager.classList.add('swift-pager');
    container.appendChild(pager);

    var pages = [];

    for (var i = 0; i < elements.length; i++) {

      pages.push(document.createElement('span'));

      pager.appendChild(pages[i]);

      pages[i].addEventListener('click', slide.bind(null, i), false);

    }

    pages[currentSlide].click();

  }

  function clearClasses() {

    for (var i = 0; i < elements.length; i++) {
      pages[i].classList.remove('active');
      elements[i].classList.remove('active');
    }

  }

  function assignClasses(index) {

    pages[index].classList.add('active');
    elements[index].classList.add('active');

  }

  function slide(index) {

    clearClasses();
    assignClasses(index);

  }

  function previousSlide() {

    if(currentSlide === 0) {
      currentSlide = elements.length;
    }

    currentSlide = currentSlide - 1;

    slide(currentSlide);

  }

  function nextSlide() {

    if (currentSlide == elements.length - 1) {
      currentSlide = -1;
    }

    currentSlide = currentSlide + 1;

    slide(currentSlide);

  }

}
