var Handlebars = require('handlebars');
 module.exports['sample'] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.escapeExpression;

  return "\n2  <li>\n3    <a href=\""
    + alias1(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"link","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">\n4      <img src=\""
    + alias1(this.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.images : depth0)) != null ? stack1.standard_resolution : stack1)) != null ? stack1.url : stack1), depth0))
    + "\">\n5    </a>\n6  </li>\n7 ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "1 "
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"useData":true});