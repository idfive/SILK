// ========================================
// Table
// ========================================

(function($) {

  $.fn.silktable = function(options) {

    // Default settings
    var settings = $.extend({
      collapsedClass: 'silk-table--collapsed',
      hideClass: 'hidden--large',
      showClass: ''
    }, options);

    // Do stuff
    return this.each(function(a) {

      // Vars
      var table = {},
          $table = $(this),
          $repsonsive_table = $('<div class="' + settings.hideClass + '" />');

      // For table header structure
      table.headers = [];

      // Thead and tbody exist (normal behaviour)
      if($table.find('> thead:first').length && $table.find(' > tbody:first').length) {
        // Push thead elements to use as headers
        $table.find('thead:first > tr th').each(function() {
          table.headers.push($(this).text());
        });

        // Table row elements
        $rowEls = $table.find('tbody > tr');
      }
      else if($table.find('> tbody:first').length) {
        // Push first row of tbody to use as headers
        $table.find('tbody').eq(0).find('tr:first').find('td, th').each(function() {
          table.headers.push($(this).text());
        });

        // Table row elements
        $rowEls = $table.find('tbody').eq(0).find('tr:gt(0)');
      }

      // Loop through each body row
      $rowEls.each(function() {

        var $row = $('<div class="' + settings.collapsedClass + '" />'),
        $ul = $('<ul />'),
        $children = $(this).children(),
        header_offset = 0;

        // If we have a row header, create a h2 element
        if($children[0].nodeName === 'TH') {
          $header = $('<h2 />');
          $header.text($children[0].innerHTML);
          $row.append($header);
          header_offset = 1;
        }

        // Loop through each row and create corresponding dt~dd
        for(var i = header_offset; i < table.headers.length; i++) {
          if($children.eq(i).text() !== '') {
            $li = $('<li />');
            $li.append($('<h3>'+table.headers[i]+'</h3>'));
            $li.append($('<div>'+$children.eq(i).text()+'</div>'));
            $ul.append($li);
          }
        }

        // Append dl to row
        $row.append($ul);
        $row.appendTo($repsonsive_table);
      });

      // Show responsive "table"
      $table.addClass(settings.showClass);
      $repsonsive_table.insertAfter($table);
    });

  };

}(jQuery));
