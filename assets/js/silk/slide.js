/* ========================================
// Swift Slide
// ===================================== */

function swift(parameters) {

  // ================
  // Setup
  // ================

  // Assign variables to previously mentioned elements
  var container = document.querySelector(parameters.container);
  var elements = document.querySelectorAll(parameters.container + ' ' + parameters.elements);

  // Controller Setup
  // ----------------

  // Create controller container
  var controller = document.createElement('div');
  controller.classList.add('controls');

  // Append controller to the swift-slide container
  container.appendChild(controller);

  // Create previous control
  var prev = document.createElement('button');
  prev.addEventListener('click', previousSlide, false);

  // Create next control
  var next = document.createElement('button');
  next.addEventListener('click', nextSlide, false);

  // Append controls to the controller
  controller.appendChild(prev);
  controller.appendChild(next);

  // The very first active slide by default
  var currentSlide = 1;

  // Pager Setup
  // ----------------

  // Create pager
  var pager = document.createElement('div');
  pager.classList.add('pager');

  // Append pager to the swift-slide container
  container.appendChild(pager);

  // Create pages array to indicate each page
  var pages = [];

  // For each slide
  for (var i = 0; i < elements.length; i++) {

    // Create a page
    pages.push(document.createElement('span'));

    // Append that page into the pager
    pager.appendChild(pages[i]);

    // Add an event listener to that page
    pages[i].addEventListener('click', slide.bind(null, i), false);

  }

  // Activate the first slide by default
  pages[1].click();

  // ================
  // Actions
  // ================

  function clearClasses() {

    // Remove active class from all pages and slides
    for (var i = 0; i < elements.length; i++) {
      pages[i].classList.remove('active');
      elements[i].classList.remove('active');
    }

  }

  function assignClasses(index) {

    // Add active class to the selected page and slide
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

    if (currentSlide === elements.length - 1) {
      currentSlide = -1;
    }

    currentSlide = currentSlide + 1;

    slide(currentSlide);

  }

}
