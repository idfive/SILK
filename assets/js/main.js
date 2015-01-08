//Require libraries
var $ = require('jquery');
var bootstrap	= require('./silk/bootstrap');

//Require Modules
var silkoffcanvas	= require('silkoffcanvas');
var silkaccordion	= require('silkaccordion');
var silktabs = require('silktabs');
var silknav = require('silknav');
var silktable = require('silktable');
var menuaim = require('menuaim');

//Initialize bootstrap
bootstrap.init();

//Initialize Silk Nav
$('.silk-nav').silknav();
$('.silk-tabs').silktabs();
$('.silk-accordion').silkaccordion();
$('.silk-table').silktable();
$('#nav').silkoffcanvas();
