(function($) {

	//Plugin
	$.fn.silkoffcanvas = function(options) {

		//Default settings
		var defaults = {};

		//Set options
		var opts = $.extend({}, defaults, options);

		//Toggle canvas
		var toggle = function($context)
		{
			return function(e)
			{
				e.preventDefault();
			};
		};

		//Let's do this...
		return this.each(function(i) {

			//Get id of element
			var id = $(this).attr('id');

			//Get toggle open button
			var $toggleOpen = $('a[href="#'+id+'"]');

			//Add toggle close button
			$(this).prepend('<a href="#'+id+'" class="hidden-desktop">&times;</a>');

			//If we have an toggle open element
			if($toggleOpen.length)
			{
				//Toggle open/close
				$('a[href="#'+id+'"]').click(function(e) {

					e.preventDefault();

					$('#'+id).toggleClass('visible');

				});
			}

		});

	};

}(jQuery));
