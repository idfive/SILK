// ========================================
// Helpers
// ========================================

silk.helpers = (function() {

  var self = {};

  self.getUrlParameter = function(param) {

    var params = window.location.search.substring(1);
    var paramsArray = params.split('&');

    for(var i = 0; i < paramsArray.length; i++) {
      var paramsName = paramsArray[i].split('=');

      if(paramsName[0] == param) {
        return paramsName[1];
      }
    }
  };

  // Add a listener for debug purposes
  window.addEventListener("keydown", debug, false);

  function debug(e) {
    // g
    if (e.keyCode == 71) {
      if (document.body.classList.contains('debug-grid')) {
        document.body.classList.remove('debug-grid');
      }
      else {
        document.body.classList.add('debug-grid');
      }
    }
    // r
    else if (e.keyCode == 82) {
      if (document.body.classList.contains('debug-handle')) {
        document.body.classList.remove('debug-handle');
      }
      else {
        document.body.classList.add('debug-handle');
      }
    }
  }

  return self;

})();
