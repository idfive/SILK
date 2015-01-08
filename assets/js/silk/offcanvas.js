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

			//Get id of
			var id = $(this).attr('id');

			//Find toggle
			var $toggle = $('a[href="#'+id+'"]');

			if($toggle.length)
			{
				$toggle.click(function(e) {

					e.preventDefault();

					$('body').toggleClass('show-canvas');

				})
			}

		});

	};

}(jQuery));
