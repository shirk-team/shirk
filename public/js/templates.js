(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['task'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "  <div id=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1._id : stack1), depth0))
    + "\" class=\"item item_task complete\">\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "  <div id=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1._id : stack1), depth0))
    + "\" class=\"item item_task\">\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <i class=\"icon large empty checkbox checked\" task="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1._id : stack1), depth0))
    + "></i>\n";
},"7":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <i class=\"icon large empty checkbox\" task="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1._id : stack1), depth0))
    + "></i>\n";
},"9":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <i class=\"icon square text file outline popup-button edit-notes black inverted column two wide no-margin\" data-html='"
    + escapeExpression(((helpers.saveNotes || (depth0 && depth0.saveNotes) || helperMissing).call(depth0, (depth0 != null ? depth0.task : depth0), {"name":"saveNotes","hash":{},"data":data})))
    + "'></i>\n";
},"11":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <i class=\"icon square text file outline popup-button edit-notes column two wide no-margin\" data-html='"
    + escapeExpression(((helpers.saveNotes || (depth0 && depth0.saveNotes) || helperMissing).call(depth0, (depth0 != null ? depth0.task : depth0), {"name":"saveNotes","hash":{},"data":data})))
    + "'></i>\n";
},"13":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <i class=\"icon square calendar popup-button edit-deadline black inverted column two wide no-margin\" data-html=\""
    + escapeExpression(((helpers.saveDeadline || (depth0 && depth0.saveDeadline) || helperMissing).call(depth0, (depth0 != null ? depth0.task : depth0), {"name":"saveDeadline","hash":{},"data":data})))
    + "\"></i>\n";
},"15":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <i class=\"icon square calendar popup-button edit-deadline column two wide no-margin\" data-html=\""
    + escapeExpression(((helpers.saveDeadline || (depth0 && depth0.saveDeadline) || helperMissing).call(depth0, (depth0 != null ? depth0.task : depth0), {"name":"saveDeadline","hash":{},"data":data})))
    + "\"></i>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1.completed : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n\n  <div class=\"ui grid middle aligned\">\n    <div class=\"column center aligned no-margin two wide\">\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1.completed : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\n\n    <div class=\"column left aligned no-margin seven wide overflow-hide\">\n      <div class=\"task-info\">\n        <span class=\"task-title\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1.title : stack1), depth0))
    + "</span><br>\n        <span class=\"task-deadline\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1.deadlineString : stack1), depth0))
    + "</span>\n      </div>\n    </div>\n\n    <div class=\"column right aligned no-margin seven wide\">\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1.notes : stack1), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1.deadline : stack1), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.program(15, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n      <i class=\"icon square ui dropdown edit-priority pointing column two wide no-margin\" task="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1._id : stack1), depth0))
    + " priority="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1.priority : stack1), depth0))
    + ">\n        <div class=\"menu ui transition hidden\">\n          <div class=\"item\" data-value=\"1\">\n            <i class=\"icon up menu-icon\"></i>\n          </div>\n          <div class=\"item\" data-value=\"0\">\n            <i class=\"icon circle blank menu-icon\"></i>\n          </div>\n          <div class=\"item\" data-value=\"-1\">\n            <i class=\"icon down menu-icon\"></i>\n          </div>\n        </div>\n      </i>\n      <i class=\"icon square remove delete-task column one wide no-margin\" task="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n      </i>\n    </div>\n  </div>\n</div>";
},"useData":true});
templates['tasks'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = this.invokePartial(partials.task, '  ', 'task', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.tasks : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"usePartial":true,"useData":true});
})();
