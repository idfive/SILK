function harmonica(parameters) {

  var container = document.querySelector(parameters.container);
  var headings = document.querySelectorAll(parameters.container + ' ' + parameters.header);
  var currentNote;

  var windowWidth = window.innerWidth;
  
  if(document.body.contains(container)) {

    for (var i = 0; i < headings.length; i++) {
      var openSymbolBottle = document.createElement('span');
      openSymbolBottle.classList.add('silk-harmonica__bottle');

      var openSymbolBubble = document.createElement('span');
      openSymbolBubble.classList.add('silk-harmonica__bubble');
      openSymbolBottle.appendChild(openSymbolBubble);

      var openSymbol = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      openSymbol.classList.add('silk-harmonica__symbol', 'symbol', 'symbol-plus');
      openSymbol.innerHTML = '<use xlink:href="#plus"></use>';
      openSymbolBubble.appendChild(openSymbol);
      headings[i].appendChild(openSymbolBottle);

      var closeSymbolBottle = document.createElement('span');
      closeSymbolBottle.classList.add('silk-harmonica__bottle');

      var closeSymbolBubble = document.createElement('span');
      closeSymbolBubble.classList.add('silk-harmonica__bubble');
      closeSymbolBottle.appendChild(closeSymbolBubble);

      var closeSymbol = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      closeSymbol.classList.add('silk-harmonica__symbol', 'symbol', 'symbol-minus');
      closeSymbol.innerHTML = '<use xlink:href="#minus"></use>';
      closeSymbolBubble.appendChild(closeSymbol);
      headings[i].appendChild(closeSymbolBottle);

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

    if(currentNote.parentNode.classList.contains('silk-harmonica--condensed') || windowWidth < 900) {

      currentNote.classList.toggle('active');

    } else {

      clearClasses(currentNote);
      assignClasses(currentNote);

    }

  }

}
