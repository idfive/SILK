// Vendor
//= include vendor/jquery-2.1.4.min.js
//= include vendor/jquery.menuaim.js

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
  $('.silk-nav').silknav();
  $('.silk-tabs').silktabs();
  $('.silk-accordion').silkaccordion();
  $('.silk-table').silktable();


}(jQuery));
