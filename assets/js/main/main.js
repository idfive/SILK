var id5 = (function($, my)
{
	var my = {};

	return my;

}(jQuery, id5 || {}));


id5.helpers = (function($)
{	
	var my = {};
	
	my.getUrlParameter = function(param)
	{
		var params = window.location.search.substring(1);
		var paramsArray = params.split('&');
		
		for(var i = 0; i < paramsArray.length; i++)
		{
			var paramsName = paramsArray[i].split('=');
			
			if(paramsName[0] == param)
			{
				return paramsName[1];
			}
		}	
	};
	
	return my;
	
}(jQuery));

id5.bootstrap = (function($)
{	
	var my = {};
	
	my.init = function()
	{
		my.showDebug();
	};
	
	my.showDebug = function()
	{
		if(id5.helpers.getUrlParameter('id5debug') === '1')
		{
			$('body').addClass('id5debug');	
		}
	};
	
	return my;
	
}(jQuery));

jQuery(function() {
	
	id5.bootstrap.init();
	
	$('.id5tnav').id5TieredNav();
	
});
(function($) {

	$.fn.id5TieredNav = function(options) {
	
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
				
			});
			
			//Set height of nav on resize
			$(window).bind('resize', function() {
				setHeight($nav);	
			}).resize();
	        
        });
	
	};

}(jQuery));