function harmonica(parameters) {

  var container = document.querySelector(parameters.container);
  var headings = document.querySelectorAll(parameters.container + ' ' + parameters.header);
  var currentNote;

  if(document.body.contains(container)) {

    for (var i = 0; i < headings.length; i++) {
      var openSymbolBottle = document.createElement('span');
      openSymbolBottle.classList.add('silk-harmonica__bottle');

      var openSymbolBubble = document.createElement('span');
      openSymbolBubble.classList.add('silk-harmonica__bubble');
      openSymbolBottle.appendChild(openSymbolBubble);

      var openSymbol = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      var openUseSymbol = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      openUseSymbol.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#caret-right');

      openSymbol.classList.add('silk-harmonica__symbol', 'symbol', 'symbol-caret-right');
      openSymbol.appendChild(openUseSymbol);
      openSymbolBubble.appendChild(openSymbol);
      headings[i].appendChild(openSymbolBottle);

      var closeSymbolBottle = document.createElement('span');
      closeSymbolBottle.classList.add('silk-harmonica__bottle');

      var closeSymbolBubble = document.createElement('span');
      closeSymbolBubble.classList.add('silk-harmonica__bubble');
      closeSymbolBottle.appendChild(closeSymbolBubble);

      var closeSymbol = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      var closeUseSymbol = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      closeUseSymbol.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#caret-down');

      closeSymbol.classList.add('silk-harmonica__symbol', 'symbol', 'symbol-caret-down');
      closeSymbol.appendChild(closeUseSymbol);
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

    if(currentNote.parentNode.classList.contains('silk-harmonica--condensed')) {

      currentNote.classList.toggle('active');

    } else {

      clearClasses(currentNote);
      assignClasses(currentNote);

    }

  }

}
