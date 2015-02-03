# idfive SILK

## Libraries/Packages/Dependencies

* Gulp (various plugins)
* Bourbon
* Neat
* Bitters
* Refills

## Install

Navigate to the project folder in terminal and run:

	git clone https://github.com/idfive/SILK.git
	
Run gulp to begin compiling sass and concatinating javascript.

It's that simple...

### Using Refills

To use any of the Refills components, go to [Refills](http://refills.bourbon.io/ "Bourbon Refills"), then copy and paste the code you'd like to use. Be sure to remove any variables that are not set from the scss.

## Handlebars

Handlebars templates are compiled directly by browserify

```javascript
var template = require('./templates/mytemplate.handlebars');
var html = template({title: "Handlebars", body: "Compiled with Gulp and Browserify"});
