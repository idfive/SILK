function silkModal() {

  var modals = document.querySelectorAll('.silk-modal');
  var closeTriggers = document.querySelectorAll('.silk-modal__trigger--close');
  var videoBottles = document.querySelectorAll('.silk-modal__bottle');
  var videos = document.querySelectorAll('.silk-modal__bottle iframe');

  for (var i = 0; i < closeTriggers.length; i++) {
    closeTriggers[i].addEventListener('click', closeModal, false);
  }

  function closeModal() {

    for (var i = 0; i < modals.length; i++) {
      modals[i].classList.remove('event-triggered');
      videoBottles[i].removeChild(videos[i]);
      videoBottles[i].appendChild(videos[i]);
    }

  }

}
