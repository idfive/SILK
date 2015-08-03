var site = (function($) {

  var kki = {};

  kki.domReady = function() {
    kki.offCanvas();
    kki.hero();
    kki.slideshow();
    kki.collapse();
  };

  kki.offCanvas = function() {

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
        $('.tray--visible').attr('class', '');

      }

    });

    $('.contains-tray').each(function() {

      $(this).append('<button class="trigger--tray icon icon-chevron-right"></button>');
      $(this).find('> ul').prepend('<button class="trigger--back icon icon-chevron-right">Go Back</button>');

    });

    $('.trigger--tray').click(function() {

      $(this).prev().addClass('tray--visible');

    });

    $('.trigger--back').click(function() {

      $(this).parent().removeClass('tray--visible');

    });

  };

  kki.hero = function() {

    $('.hero').each(function() {

      var image = $(this).find('img').attr('src');
      $(this).css('background-image', 'url(' + image + ')');

    });

  };

  kki.collapse = function() {

    $('.nav__collapse h3').click(function() {

      $(this).parent().toggleClass('nav-is-active');

    });

  };

  kki.slideshow = function() {

    babySonicSlide(
      'slideshow--main',
      '.slideshow__controls--main',
      '.slideshow__pagination--main',
      '.slideshow__slides--main > *');

    babySonicSlide(
      'slideshow--events',
      '.slideshow__controls--events',
      '.slideshow__pagination--events',
      '.slideshow__slides--events > *');

    babySonicSlide(
      'slideshow--happy',
      '.slideshow__controls--happy',
      '.slideshow__pagination--happy',
      '.slideshow__slides--happy > *');

    function babySonicSlide(list, listController, listPagination, listElement) {

      // Variable Setup
      // =================

      var prev = listController + ' .prev';
      var next = listController + ' .next';

      var pagination = listPagination;
        var paginationItem = pagination + ' span';

      var element = listElement;

      var activeClass = 'active';
        var activeElement = element + '.' + activeClass;


      // Setup Controls
      // =================

      $(listController)
        .append('<span class="prev control" />')
        .append('<span class="next control" />');


      // Setup Pagination
      // =================

      if(!($(pagination + ' span').length)) {

        $(element).each(function() {

          $(pagination)
            .append('<span></span>');

        });

      }


      // Preparations
      // =================

      $(element + ':first-child')
        .addClass(activeClass);

      $(paginationItem + ':first-child')
        .addClass(activeClass);


      // Actions
      // =================

      // Previous Click
      // =================

      $(prev).click(function() {

        if($(element + ':first-child').hasClass(activeClass)) {

          $(activeElement)
            .removeClass(activeClass);

          $(element)
            .last()
              .addClass(activeClass);

        }

        else {

          $(activeElement)
            .removeClass(activeClass)
            .prev()
              .addClass(activeClass);

        }

        coordinatePagination();

      });


      // Next Click
      // =================

      $(next).click(function() {

        if($(element + ':last-child').hasClass(activeClass)) {

          $(activeElement)
            .removeClass(activeClass);

          $(element)
            .first()
              .addClass(activeClass);

        }

        else {

          $(activeElement)
            .removeClass(activeClass)
            .next()
              .addClass(activeClass);

        }

        coordinatePagination();

      });


      // Pagination Click
      // =================

      $(paginationItem).click(function() {

        $(paginationItem)
          .removeClass(activeClass);
        $(this)
          .addClass(activeClass);

        $(activeElement)
          .removeClass(activeClass);
        $(element + ':nth-child(' + ($(paginationItem + '.' + activeClass).index() + 1) + ')')
          .addClass(activeClass);

      });


      // Pagination Coor.
      // =================

      function coordinatePagination() {

        $(paginationItem)
          .removeClass(activeClass);
        $(paginationItem + ':nth-child(' + ($(activeElement).index() + 1) + ')')
          .addClass(activeClass);

      }



      //stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
      var listContainer =  document.getElementsByClassName(list);
      listContainer = listContainer[0];

      listContainer.addEventListener('touchstart', handleTouchStart, false);
      listContainer.addEventListener('touchmove', handleTouchMove, false);

      var xDown = null;
      var yDown = null;

      function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
      }

      function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
          return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {

          if ( xDiff > 0 ) {
            $('.next').trigger('click');
          } else {
            $('.prev').trigger('click');
          }

        }

        /* reset values */
        xDown = null;
        yDown = null;
      }

    }

  };


  return kki;

})(jQuery);

(function($){

  site.domReady();

})(jQuery);
