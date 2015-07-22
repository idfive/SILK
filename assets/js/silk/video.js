// ========================================
// Video
// ========================================

(function($) {

  $(document).ready(function () {
    var videoElement = document.getElementById('videoModule'),
        $window = $(window);

    $window.resize(function() {
      var windowWidth = $window.width();

      if (windowWidth < 1000 && !videoElement.paused) {
        videoElement.pause();
      }
      else if (windowWidth >= 1000 && videoElement.paused) {
        videoElement.play();
      }
    });
  });

}(jQuery));
