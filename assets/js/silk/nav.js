// ========================================
// Navigation
// ========================================

(function($) {

  $.fn.silknav = function(options) {

    // Setup nav class, active class, item id iterator, and nav history array
    var nav = '.silk-nav',
        active = 'silk-menu--active',
        itemId = 1,
        $history = [];

    $('.silk-nav ul ul').each(function() {

      // Add a data-item-id & trigger to each list
      $(this)
        .attr('data-item-id', itemId)
        .before('<button aria-hidden="true" class="trigger--advance"><i class="icon icon-chevron-right"></i><span class="visible-for-screen-readers">Next Munu</span></button>');

      // Increment the item Id to identify the next list
      itemId++;

      // Add a label to the list
      $(this).prev().prev().clone().prependTo($(this));

    });

    $('.trigger--revert').click(function() {

      // Remove all active classes from the nav
      $('.' + active).removeClass(active);

      // Empty the history array
      $history = [];

    });

    $('.trigger--reverse').click(function() {

      // Copy the id of the array item that was removed
      var listToReverse = $history.pop();

      // Use the copied id to remove the active class from the last active list
      $('[data-item-id=' + listToReverse + ']').removeClass(active);

      // If the array is empty, remove the active class from the entire nav
      if($history.length < 1) {

        $(nav).removeClass(active);

      }

    });

    $('.trigger--advance').click(function() {

      // Add a class to the list after the trigger
      $(this).next().addClass(active);

      // Add this list to the history array
      $history.push($(this).next().data('item-id'));

      // Add an active class to the nav
      $(nav).addClass(active);

    });

  };

  // $.fn.silknav = function(options) {

  //   var settings = $.extend({
  //     parentEl: 'a',
  //     heightOffset: 1
  //   }, options);

  //   function shift($el, length, offset) {
  //     // Calculate move value
  //     var move = ((length - offset) * 100) * -1;

  //     // Move
  //     $el.find('> ul').css('left', move + '%');
  //   }

  //   function menuaimActivate(row) {
  //     $row = $(row);

  //     $row.addClass('hover');

  //     if($row.hasClass('parent')) {
  //       var $child = $row.find('> ul:first');
  //       var $parent = $row.parent('ul');
  //     }
  //   }

  //   function menuaimDeactivate(row) {
  //     $(row).removeClass('hover');
  //   }

  //   function menuaimExitMenu(menu) {
  //     return true;
  //   }

  //   return this.each(function() {

  //     // Shortcut to nav element
  //     var $nav = $(this);

  //     // Add parent class to sub menus
  //     $nav.find(settings.parentEl).each(function() {

  //       // Get child element
  //       var $child = $(this).next('ul');

  //       // If we have a child...
  //       if($child.length) {
  //         // Add parent class
  //         $(this).parent().addClass('parent');

  //         // Create next link
  //         $(this).append('<span class="next" />');

  //         // Create back link
  //         $child.prepend($('<li><a href="#" class="back">'+$(this).text()+'</a></li>'));
  //       }

  //     // Attach behaviour for clicking parent element
  //     }).end().find('.parent > ' + settings.parentEl + ' > .next').click(function(e) {

  //       // Stop href from firing
  //       e.preventDefault();

  //       // Get siblings so we can adjust z-index
  //       $(this).parent().parent().find('> ul').removeClass('hidden').end().siblings().find('> ul').addClass('hidden');

  //       // Shift nav
  //       shift($nav, $(this).parents('li').length, 0);

  //     // Attach behaviour for clicking back button
  //     }).end().find('a.back').click(function(e) {

  //       // Stop href from firing
  //       e.preventDefault();

  //       // Shift nav
  //       shift($nav, $(this).parents('li').length, 2);

  //     });

  //     // If menuAim is available
  //     if($.fn.menuAim) {
  //       $nav.addClass('menuaim').find('ul').menuAim({
  //         activate: menuaimActivate,
  //         deactivate: menuaimDeactivate,
  //         exitMenu: menuaimExitMenu
  //       });
  //     }

  //   });

  // };

}(jQuery));
