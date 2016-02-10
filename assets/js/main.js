// Vendor
//= include vendor/jquery-2.2.0.min.js

// SILK Core
//= include silk/silk.js

// SILK Modules
//= include silk/accordion.js
//= include silk/offcanvas.js
//= include silk/nav.js
//= include silk/table.js
//= include silk/tabs.js

// Bootstrap
(function($) {

  // Run SILK bootstrap

  // Initialize SILK modules
  $('.silk-accordion').silkaccordion();
  $('.silk-nav').silknav();
  $('.silk-table').silktable();
  $('.silk-tabs').silktabs();


}(jQuery));
