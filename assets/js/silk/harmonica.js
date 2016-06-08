function harmonica(parameters) {

  var container = document.querySelector(parameters.container);
  var headings = document.querySelectorAll(parameters.container + ' ' + parameters.header);
  var currentNote;

  if(document.body.contains(container)) {

    for (var i = 0; i < headings.length; i++) {
      var headingOpenIcon = document.createElement('svg');
      headingOpenIcon.classList.add('symbol', 'symbol-plus');
      headingOpenIcon.innerHTML = '<use xlink:href="plus"></use>';
      headings[i].appendChild(headingOpenIcon);

      var headingCloseIcon = document.createElement('svg');
      headingCloseIcon.classList.add('symbol', 'symbol-minus');
      headingCloseIcon.innerHTML = '<use xlink:href="plus"></use>';
      headings[i].appendChild(headingCloseIcon);

      headings[i].addEventListener('click', toggleNote, false);
    }

    headings[0].click();

  }

  function clearClasses() {

    for (var i = 0; i < headings.length; i++) {
      headings[i].classList.remove('active');
    }

  }

  function assignClasses(currentNote) {

    currentNote.classList.add('active');

  }

  function toggleNote(event) {

    currentNote = event.currentTarget;

    clearClasses();
    assignClasses(currentNote);

  }

}
