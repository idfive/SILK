'use strict';

var helpers = require('./helpers');

var init = function()
{
	showDebug();
}

var showDebug = function()
{
	if(helpers.getUrlParameter('id5debug') === '1')
	{
		document.getElementsByTagName('body')[0].className += ' id5debug';	
	}
}

exports.init = init;