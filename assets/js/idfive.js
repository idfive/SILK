var id5 = (function($)
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
	
});