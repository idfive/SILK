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

  return self;

})();
