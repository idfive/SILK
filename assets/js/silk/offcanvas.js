silk.offcanvas = (function() {

  var self = {};

  self.init = function() {

    $('body').attr('data-drawer-state','invisible');

    $('.drawer__trigger').click(function() {

      if ($('[data-drawer-state=invisible]').length === 1) {

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

  return self;

})();

silk.offcanvas.init();
