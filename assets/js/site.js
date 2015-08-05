var site = (function($) {

  var silksite = {};

  silksite.domReady = function() {
    silksite.drawer();
    silksite.justdoit();
  };

  silksite.drawer = function() {

    $('body').attr('data-drawer-state','invisible');

    $('.drawer__trigger').click(function() {

      if ($('body[data-drawer-state=invisible]').length === 1) {

        $('body').attr('data-drawer-state','visible');

      }

      else {

        $('body').attr('data-drawer-state','invisible');

      }

    });

    $(document).on('click', function(event) {

      if (!$(event.target).closest('.drawer, .drawer__trigger').length) {

        $('body').attr('data-drawer-state','invisible');

      }

    });

  };

  silksite.justdoit = function() {

  };

  return silksite;

})(jQuery);

(function($){

  site.domReady();

})(jQuery);
