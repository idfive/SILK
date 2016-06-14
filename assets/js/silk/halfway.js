function halfway(parameters) {

  document.addEventListener('scroll', calculateHalfway, false);

  var windowHeight = window.innerHeight;
  var elements = document.querySelectorAll(parameters.element);
  var elementHitBoxes = [];

  if(parameters.anchors) {

    var anchorSet = document.createElement('div');
    anchorSet.classList.add('pager', 'anchor-set');

    for(var i = 0; i < elements.length; i++) {

      var anchor = document.createElement('a');
      var anchorLabel = document.createElement('span');
      var elementLabel = elements[i].getAttribute('id');

      anchor.classList.add('anchor-set__point');
      anchor.setAttribute('href', '#' + elementLabel);
      anchor.addEventListener('click', offsetWindow, false);

      elementLabel = elementLabel.replace(/-/g, ' ');

      anchorLabel.innerHTML = elementLabel;
      anchorLabel.classList.add('anchor-set__label');

      anchor.appendChild(anchorLabel);

      anchorSet.appendChild(anchor);

    }

    elements[0].parentNode.appendChild(anchorSet);
    anchorSet.children[0].classList.add('indicate-halfway');

  }

  function offsetWindow(event) {

    sectionTarget = event.currentTarget.getAttribute('href');
    sectionTarget = sectionTarget.replace('#', '');
    sectionTarget = document.getElementById(sectionTarget);
    sectionTarget = sectionTarget.getBoundingClientRect();

    window.scrollBy(0, sectionTarget.top - parameters.offset);

    event.preventDefault();

  }

  function calculateHalfway() {

    for(var i = 0; i < elements.length; i++) {
      
      elementHitBoxes[i] = elements[i].getBoundingClientRect();

      if(elementHitBoxes[i].top <= windowHeight / 2 && elementHitBoxes[i].bottom >= windowHeight / 2) {

        elements[i].classList.add('element-halfway');

        if(parameters.anchors) {
          anchorSet.children[i].classList.add('indicate-halfway');
        }

      } else {

        elements[i].classList.remove('element-halfway');

        if(parameters.anchors) {
          anchorSet.children[i].classList.remove('indicate-halfway');
        }

      }

    }

  }

}
