function silkModal() {

  var modals = document.querySelectorAll('.silk-modal');
  var openTriggers = document.querySelectorAll('.silk-modal__trigger');
  var closeTriggers = document.querySelectorAll('.silk-modal__trigger--close');
  var videoBottles = document.querySelectorAll('.silk-modal__bottle');
  var videos = document.querySelectorAll('.silk-modal__bottle iframe');

  for(var i = 0; i < openTriggers.length; i++) {

    openTriggers[i].addEventListener('click', openModal, false);
    closeTriggers[i].addEventListener('click', closeModal, false);

  }

  function openModal() {

    document.body.classList.add('modal-triggered');
    event.currentTarget.parentNode.classList.add('event-triggered');

  }

  function closeModal() {

    document.body.classList.remove('modal-triggered');

    for (var i = 0; i < modals.length; i++) {
      modals[i].classList.remove('event-triggered');
      videoBottles[i].removeChild(videos[i]);
      videoBottles[i].appendChild(videos[i]);
    }

  }

}
