(function($) {

	$.fn.silkaccordion = function(options) {
	
		//Default settings
		var settings = $.extend({
			prefix: 'silk-accordion',
			contentClass: 'silk-accordion--content',
			headerClass: 'silk-accordion--header',
			navClass: 'silk-accordion--nav',
			tabClass: 'silk-accordion--section',
			openOnLoad: ''
		}, options);
		
		//Toggle accordion on click
		var toggle = function($context)
		{
			return function(e)
			{
				//Prevent default behaviour
				e.preventDefault();
				
				//Hash contains id
				var href = e.currentTarget.hash;
				
				//Toggle clicked accordion
				$context.find('a[href="'+href+'"]').toggleClass('is-active').end();
				$(href).find('.'+settings.contentClass).toggleClass('is-hidden');
			};
		};
		
		//Do stuff
		return this.each(function(a) {
		
			//Save reference to this element
			var $theEl = $(this);
			
			//Loop through each tab (hide all but the first)
			$theEl.find('> *').addClass(settings.tabClass).each(function(b) {
				
				//Save reference to this element
				var $sectionEl = $(this);
				
				//Create unique id for this element
				var id = settings.prefix + '-' + a.toString() + '-' + b.toString();
			
				//Get first header element (h1, h2...)
				var $heading = $(this).find('> header :header').first();
				
				//Add class to content and header
				$(this)
					.find('> div').first().addClass(settings.contentClass).end().end()
					.find('> header').first().addClass(settings.headerClass);
				
				//Turn header into a navigation link
				$heading.wrapInner('<a href="#'+id+'" aria-controls="'+id+'" role="tab" />').find('a').click(toggle($theEl));
				
				//Set the id
				$sectionEl.attr({
					'id' : id,
					'role' : 'tabpanel'
				});
				
			});
			
			//Close accordions except ones specified in openSelector setting
			$theEl.find('.'+settings.headerClass+' a').filter(settings.openOnLoad).addClass('is-active');
			$theEl.find('.'+settings.contentClass).addClass('is-hidden').filter(settings.openOnLoad).removeClass('is-hidden');
		});
	};
}(jQuery));