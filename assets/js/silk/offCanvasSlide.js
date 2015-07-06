(function($) {

	$('.offCanvasTrigger').on('click', function(){

		if ($('#site-offCanvas').hasClass('show-nav')) {
		  // Do things on Nav Close
		  $('#site-wrapper').removeClass('show-nav');
			$('#site-header').removeClass('show-nav');
			$('#site-offCanvas').removeClass('show-nav');
		} else {
		  // Do things on Nav Open
		  $('#site-wrapper').addClass('show-nav');
			$('#site-header').addClass('show-nav');
			$('#site-offCanvas').addClass('show-nav');
		}

	})

}(jQuery));
