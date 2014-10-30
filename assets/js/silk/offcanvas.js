(function($) {

	$.fn.silkoffcanvas = function(options) {
	
		//Default settings
		var settings = $.extend({
			toggleClass: 'silk-offcanvas--toggle',
			linkText: 'Menu',
			something: false
		}, options);
		
		//Toggle content on click
		var toggleCanvas = function($context)
		{
			return function(e)
			{
				e.preventDefault();
				
				var targetId = $(this).data('silk-offcanvas-ref');
				
				$('[data-silk-offcanvas-id='+targetId+']').addClass('visible');
			};
		};
		
		//Handles scrolling to tabs from hash in URL
		var scrollToTabs = function($navUl, $tabsEl)
		{
			
		};
		
		//Let's do this...
		return this.each(function(i) {
		
			var $el = $(this);
			
			$el.attr('data-silk-offcanvas-id', i).after('<a href="#" class="'+settings.toggleClass+'" data-silk-offcanvas-ref="'+i+'">'+settings.linkText+'</a>');
			
			$('.'+settings.toggleClass).click(toggleCanvas());
			
		});
		
	};
}(jQuery));