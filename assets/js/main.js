//Require libraries
var $ 			= require('jquery');
var bootstrap	= require('./silk/bootstrap');

//Require Modules
var silktabs	= require('silktabs');
var silknav		= require('silknav');
var menuaim		= require('menuaim');

//Initialize bootstrap
bootstrap.init();

//Initialize Silk Nav
$('.silk-nav').silknav();
$('.silk-tabs').silktabs();