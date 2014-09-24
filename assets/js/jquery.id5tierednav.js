(function($) {

	$.fn.id5TieredNav = function(options) {
	
		var settings = $.extend({
			color: "#556b2f",
			backgroundColor: "white"
		}, options);
		
		function shift($el, length, offset)
		{
			//Calculate move value
			var move = ((length - offset) * 100) * -1;
				
			//Move
			$el.find('> ul').css('left', move + '%');
		}
		
		return this.each(function() {
		
			//So we can calculate hight of largest nav element
			var navHeight = 0;
			
			//Shortcut to nav element
			var $nav = $(this);
			
			//Add parent class to sub menus
			$nav.find('a').each(function() {
			
				//Get child element
				var $child = $(this).next('ul');
			
				//If we have a child...
				if($child.length)
				{
					//Add parent class
					$(this).addClass('parent');
					
					//Create back link
					$child.prepend($('<li><a href="#" class="back">'+$(this).text()+'</a></li>'));
				}
			
			//Attach behaviour for clicking parent element
			}).end().find('a.parent').click(function(e) {
			
				//Stop href from firing
				e.preventDefault();
				
				//Get siblings so we can adjust z-index
				$(this).parent().find('> ul').removeClass('hidden').end().siblings().find('> ul').addClass('hidden');
				
				//Shift nav
				shift($nav, $(this).parents('li').length, 0);
			
			//Attach behaviour for clicking back button
			}).end().find('a.back').click(function(e) {
			
				//Stop href from firing
				e.preventDefault();
				
				//Shift nav
				shift($nav, $(this).parents('li').length, 2);
				
			//Set height of each element to the largest
			}).end().find('ul').each(function() {
			
				if ($(this).outerHeight() > navHeight)
				{
					navHeight = $(this).outerHeight();
				}
				
			}).end().css('min-height', navHeight);
	        
        });
	
	};

}(jQuery));