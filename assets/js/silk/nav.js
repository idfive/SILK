(function($) {

	$.fn.silknav = function(options) {
	
		var settings = $.extend({
			color: "#556b2f",
			backgroundColor: "white"
		}, options);
		
		//So we can calculate height of largest nav element
		var navHeight = 0;
		
		function shift($el, length, offset)
		{
			//Calculate move value
			var move = ((length - offset) * 100) * -1;
				
			//Move
			$el.find('> ul').css('left', move + '%');
		}
		
		function setHeight($el)
		{
			$el.find('ul').each(function() {
			
				if ($(this).outerHeight() > navHeight)
				{
					navHeight = $(this).outerHeight();
				}
				
			}).end().css('min-height', navHeight);
		}
		
		function menuaimActivate(row)
		{
			$row = $(row);
		
			$row.addClass('hover');
			
			if($row.hasClass('parent'))
			{
				var $child = $row.find('> ul:first');
				var $parent = $row.parent('ul');
				
				if($parent.parents('ul').length && $child.height() > $parent.height())
				{
					$parent.css('height',$child.height());
				}
			}
		}
		
		function menuaimDeactivate(row)
		{	
			$(row).removeClass('hover');
		}
		
		function menuaimExitMenu(menu)
		{
			return true;
		}
		
		return this.each(function() {
			
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
					$(this).parent().addClass('parent');
					
					//Create next link
					$(this).append('<span class="next" />');
					
					//Create back link
					$child.prepend($('<li><a href="#" class="back">'+$(this).text()+'</a></li>'));
				}
			
			//Attach behaviour for clicking parent element
			}).end().find('.parent > a > .next').click(function(e) {
			
				//Stop href from firing
				e.preventDefault();
				
				//Get siblings so we can adjust z-index
				$(this).parent().parent().find('> ul').removeClass('hidden').end().siblings().find('> ul').addClass('hidden');
				
				//Shift nav
				shift($nav, $(this).parents('li').length, 0);
			
			//Attach behaviour for clicking back button
			}).end().find('a.back').click(function(e) {
			
				//Stop href from firing
				e.preventDefault();
				
				//Shift nav
				shift($nav, $(this).parents('li').length, 2);
				
			});
			
			//Set height of nav on resize
			$(window).bind('resize', function() {
				setHeight($nav);	
			}).resize();
			
			//If menuAim is available
			if($.fn.menuAim)
			{
				$nav.addClass('menuaim').find('ul').menuAim({
					activate: menuaimActivate,
					deactivate: menuaimDeactivate,
					exitMenu: menuaimExitMenu
				});
			}
	        
        });
	
	};

}(jQuery));