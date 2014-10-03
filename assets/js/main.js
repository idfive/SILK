//Require libraries
var $ 			= require('jquery');
var bootstrap	= require('./silk/bootstrap');

//Require Modules
var silkmenu	= require('silkmenu');
var menuaim		= require('menuaim');

//Initialize bootstrap
bootstrap.init();

//Initialize Silk Menu
$('.silkmenu').silkmenu();