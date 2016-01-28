/* ========================================
// Silk Nav
// ===================================== */

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
        .before('<button aria-hidden="true" class="trigger--advance"><svg class="symbol-chevron-right"><use xlink:href="#chevron-right"></use></svg><span class="visible-for-screen-readers">Next Munu</span></button>');

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

}(jQuery));
