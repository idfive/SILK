// ========================================
// Navigation
// ========================================

(function($) {

  $.fn.silknav = function(options) {

    var itemId = 1,
        active = 'silk-menu--active',
        $history = [];

    $('.silk-nav li').each(function() {

      $(this).attr('data-item-id', itemId);
      itemId++;

      if($(this).find('> ul').length) {

        $(this).find('> ul').before('<button class="trigger--advance"></button>');

      }

    });

    $('.trigger--revert').click(function() {

      $('.' + active).removeClass(active);

    });

    $('.trigger--reverse').click(function() {

      var currentTree = $history.pop();

      $('[data-item-id='+ currentTree +']').parent().removeClass(active);
      $('[data-item-id='+ currentTree +']').parent().prev().prev().addClass(active);
      $('[data-item-id='+ currentTree +']').removeClass(active);

    });

    $('.trigger--advance').click(function() {

      $(this).parent().parent().find('.' + active).removeClass(active);
      $(this).parent().parent().parent().find('a.' + active).removeClass(active);
      $(this).parent().parent().addClass(active);
      $(this).parent().addClass(active);
      $(this).prev().addClass(active);

      $history.push($(this).parent().data('item-id'));

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
