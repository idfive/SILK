// ========================================
// Tabs
// ========================================

(function($) {

  $.fn.silktabs = function(options) {

    // Default settings
    var settings = $.extend({
      prefix: 'silk-tabs',
      wrapperClass: 'silk-tabs__wrapper',
      headerClass: 'silk-tabs__header',
      contentClass: 'silk-tabs__content',
      navClass: 'silk-tabs__nav',
      tabClass: 'silk-tabs__tab',
      desktopStartWidth: 1000
    }, options);

    // Toggle tabs on click
    var toggleTabs = function($context) {
      return function(e) {
        // Prevent default behaviour
        if($(window).width() >= settings.desktopStartWidth) {
          e.preventDefault();
        }

        // Hash contains id
        var href = e.currentTarget.hash;

        // Show and hide tabs
        // Hides currently open tab in accordion mode
        if($(this).hasClass('is-active')) {
          // Hide all tab sections and add active class
          $context
            .find('*').removeClass('is-hidden-accordion is-active-tabs is-active').end()
            .find('[href="' + href + '"]').addClass('is-active-tabs').end();

          // Hide content section in accordion mode
          $(href).find('.' + settings.contentClass).toggleClass('is-hidden-accordion');
        }
        // Hide all tabs except one being clicked
        else {
          // Hide all tab sections and add active class
          $context
            .find('*').removeClass('is-hidden-accordion is-active-tabs is-active').end()
            .find('[href="' + href + '"]').addClass('is-active').end()
            .find('.' + settings.contentClass).addClass('is-hidden').end();

          // Show clicked tab section
          $(href).find('.'+settings.contentClass).removeClass('is-hidden');
        }
      };
    };

    // Handles scrolling to tabs from hash in URL
    var scrollToTabs = function($navUl, $tabsEl) {
      // Get the hash
      var locationHash = window.location.hash;

      // Check the tabs exists
      if($(locationHash).length) {
        // Get the tab element to open
        var $tabToOpen = $navUl.find('[href=' + locationHash + ']');

        // Specify element to scroll to
        var $scrollTo = $(locationHash);

        // Open the specified tab
        $tabToOpen.click();

        // On desktop, scroll to tab container, not tab itself
        if($(window).width() >= settings.desktopStartWidth) {
          $scrollTo = $tabsEl;
        }

        //Scroll to the element
        $('html, body').animate({
          scrollTop: $scrollTo.offset().top
        }, 500);
      }
    };

    // Let's do this...
    return this.each(function(a) {

      // Save reference to this element
      var $tabsEl = $(this);

      // Add id so we can jump to these tabs
      $tabsEl.attr('id', settings.prefix + '-' + a.toString());

      // To store tabs navigation
      var nav = [];

      // Create nav HTML elements
      var $nav = $('<nav class="' + settings.navClass + '" />');
      var $navUl = $('<ul role="tablist" />');

      // Add the wrapper class around all tabs
      $(this).wrapInner('<div class="' + settings.wrapperClass + '" />');

      // If the nav has a header, prepend it
      if($tabsEl.attr('data-nav-title')) {
        $nav.prepend('<h2>' + $tabsEl.attr('data-nav-title') + '</h2>');
      }

      // Loop through each tab (hide all but the first)
      $tabsEl.find('> .' + settings.wrapperClass + ' > *').addClass(settings.tabClass).each(function(b) {

        // Save reference to this element
        var $sectionEl = $(this);

        // Create unique id for this element
        var id = settings.prefix + '-' + a.toString() + '-' + b.toString();

        // Get first header element (h1, h2...)
        var $heading = $(this).find('> header :header').first();

        // Add class to content and header
        $(this)
          .find('> div').first().addClass(settings.contentClass).end().end()
          .find('> header').first().addClass(settings.headerClass);

        // Push nav element
        nav.push({
          id : id,
          name : $heading.text()
        });

        // Turn header into a navigation link (for accordian view)
        $heading.wrapInner('<a href="#'+id+'" aria-controls="'+id+'" role="tab" />').find('a').click(toggleTabs($tabsEl));

        // Set the id
        $sectionEl.attr({
          'id' : id,
          'role' : 'tabpanel'
        });

      });

      // If we have navigation elements...
      if(nav.length) {
        // Create tab nav HTML structure
        $nav.append($navUl);

        // Add each nav element
        for(var c=0; c < nav.length; c++) {
          $('<li><a href="#' + nav[c].id + '" aria-controls="' + nav[c].id + '" role="tab">' + nav[c].name+'</a></li>').appendTo($navUl);
        }

        // Nav click behaviour
        $navUl.find('a').click(toggleTabs($tabsEl));
      }

      // Add nav to DOM
      $tabsEl.prepend($nav);

      // Activate first tab
      $navUl.find('a:first').click();

      // See if we should open a specific tab (passed in the URL)
      if(window.location.hash.indexOf(settings.prefix) > 0) {
        scrollToTabs($navUl, $tabsEl);
      }
    });

  };

}(jQuery));
