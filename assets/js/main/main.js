jQuery(function() {
	$('body').addClass('has-js');
});


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
		if(id5.helpers.getUrlParameter('id5-debug') === '1')
		{
			$('body').addClass('id5-debug');	
		}
	};
	
	return my;
	
}(jQuery));

jQuery(function() {
	
	id5.bootstrap.init();
	
	//Add parent class
	$('nav').find('a').each(function() {
	
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
	
	}).end().find('a.parent').click(function(e) {
	
		//Stop href from firing
		e.preventDefault();
		
		//Calculate move value
		var move = ($(this).parents('li').length * 100) * -1;
		
		//Move
		$('.nav > ul').css('left', move + '%');
		
	}).end().find('a.back').click(function(e) {
	
		//Stop href from firing
		e.preventDefault();
		
		//Calculate move value
		var move = (($(this).parents('li').length -2) * 100) * -1;
		
		//Move
		$('.nav > ul').css('left', move + '%');
	});
	
});