(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['task'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<div id=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1._id : stack1), depth0))
    + "\" class=\"item item_task ui two column grid middle aligned\">\n    <span class=\"column left aligned no-margin\">\n        <i class=\"icon empty checkbox\"></i>\n        <span>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1.title : stack1), depth0))
    + "</span>\n    </span>\n\n    <span class=\"column right aligned no-margin\">\n      <i class=\"icon square text file outline popup-button edit-notes\" data-html=\"<div class='ui form'><textarea>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1.notes : stack1), depth0))
    + "</textarea><button class='ui button save-notes' task='"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1._id : stack1), depth0))
    + "'>SAVE</button></div>\"></i>\n      <i class=\"icon square calendar\"></i>\n      <i class=\"icon square circle blank\"></i>\n    </span>\n</div>";
},"useData":true});
templates['tasks'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = this.invokePartial(partials.task, '    ', 'task', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.tasks : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n";
},"usePartial":true,"useData":true});
})();
