(function($) {

	$.fn.silkoffcanvas = function(options) {

		//Default settings
		var settings = {};
		var defaults = {
			wrapperClass: 'silk-offcanvas--wrapper',
			toggleClass: 'silk-offcanvas--toggle',
			closeClass: 'silk-offcanvas--close',
			toggleText: 'Menu',
			toggleSelector: '',
			overlay: false,
			position: 'left'
		};

		//Allowed positions
		var allowedPositions = ['left','right'];

		//Toggle content on click
		var toggleCanvas = function($context)
		{
			return function(e)
			{
				//Prevent default behavior
				e.preventDefault();

				//Get target element
				var $targetEl = $('[data-silk-offcanvas-id='+$(this).attr('data-silk-offcanvas-ref')+']');

				//if we found the target element
				if($targetEl.length)
				{
					//Toggle visible class
					$targetEl.toggleClass('visible');

					//If not overlaying the hidden content
					if(!settings.overlay)
					{
						if($('body').hasClass('silk-offcanvas-active'))
						{
							$('body').removeClass('silk-offcanvas-active')
								.css('position', 'inherit')
								.css(settings.position, 0)
								.css('width', 'auto');

							$('html').css('overflow-x', 'auto');
						}
						else
						{
							$('body').addClass('silk-offcanvas-active')
								.css('position', 'absolute')
								.css(settings.position, $targetEl.outerWidth())
								.css('width', $(window).width());

							$('html').css('overflow-x', 'hidden');
						}
					}
				}
			};
		};

		//Let's do this...
		return this.each(function(i) {

			//Extend settings
			settings = $.extend(true, {}, defaults, options);

			if(!$(set))

			//Get position
			var position = $(this).data('silk-offcanvas-position');

			//Add position to settings
			if($.inArray(position, allowedPositions) > -1)
			{
				settings.position = position;
			}

			//Add id so we can reference element
			$(this).attr('data-silk-offcanvas-id', i);

			//Create toggle link or find link based on passed in selector
			if(settings.toggleSelector == '')
			{
				//Create toggle element
				var $toggleEl = $('<a href="#">'+settings.toggleText+'</a>');

				//Insert toggle element
				$toggleEl.insertAfter($(this));
			}
			else
			{
				var $toggleEl = $(settings.toggleSelector);
			}

			//If no toggle element, return
			if(!$toggleEl.length)
			{
				return false;
			}

			//Add class and data attribute
			$toggleEl.addClass(settings.toggleClass).attr('data-silk-offcanvas-ref', i);

			//Attach toggle click
			$toggleEl.click(toggleCanvas());

			//Add close button
			$(this).prepend('<a href="#" class="'+settings.closeClass+'">Close</a>').find('.'+settings.closeClass).click(function(e) {
				$toggleEl.click();
			});

		});

	};
}(jQuery));
