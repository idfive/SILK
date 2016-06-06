function triggerParent(parameters) {

  var triggers = document.querySelectorAll(parameters.trigger);

  for(var i = 0; i < triggers.length; i++) {
    triggers[i].addEventListener('click', toggleParentClass, false);
  }

  if(document.body.contains(triggers[0])) {
    
    function toggleParentClass(event) {

      event.currentTarget.parentNode.classList.toggle('event-triggered');

    }

  }

}
