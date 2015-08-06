// ========================================
// Bootstrap.js
// ========================================

silk.bootstrap = (function() {
  
  var self = {};
  
  /*
   * Initialize
   */
  self.init = function() {
    
    self.showMediaQueryDebug();
    
  };
  
  /*
   * Show current media query on screen
   */
  self.showMediaQueryDebug = function() {
    
    if(silk.helpers.getUrlParameter('mqdebug') === '1') {
      document.getElementsByTagName('body')[0].className += ' mqdebug';
    }
    
  };
  
  return self;
  
})();

silk.bootstrap.init();