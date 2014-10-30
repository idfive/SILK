(function($) {

	$.fn.silkoffcanvas = function(options) {
	
		//Default settings
		var settings = $.extend({
			toggleClass: 'silk-offcanvas--toggle',
			closeClass: 'silk-offcanvas--close',
			toggleText: 'Menu',
			toggleSelector: '',
			overlay: false,
			position: 'left'
		}, options);
		
		//Toggle content on click
		var toggleCanvas = function($context)
		{
			return function(e)
			{	
				//Prevent default behavior
				e.preventDefault();
				
				//Get target element
				var $targetEl = $('[data-silk-offcanvas-id='+$(this).attr('data-silk-offcanvas-ref')+']');
				
				window.console.log($targetEl);
				
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
								.css('margin-'+settings.position, 0)
								.css('width', 'auto');
								
							$('html').css('overflow-x', 'auto');
						}
						else
						{
							$('body').addClass('silk-offcanvas-active')
								.css('margin-'+settings.position, $targetEl.outerWidth())
								.css('width', $(window).width());
								
							$('html').css('overflow-x', 'hidden');
						}
					}
				}
			};
		};
		
		//Let's do this...
		return this.each(function(i) {
			
			//Add id so we can find this element later
			$(this).attr('data-silk-offcanvas-id', i);
			
			//Create Toggle link or find link based on passed in selector
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
			
			//If overlay, add close button
			if(settings.overlay)
			{
				$(this).prepend('<a href="#" class="'+settings.closeClass+'">Close</a>').find('.'+settings.closeClass).click(function(e) {
					$toggleEl.click();	
				});
			}
			
		});
		
	};
}(jQuery));