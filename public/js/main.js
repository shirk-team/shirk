Handlebars.registerPartial('tasks', Handlebars.templates['tasks']);
Handlebars.registerPartial('task', Handlebars.templates['task']);

$(document).ready(function() {
  $('.button#logout').click(function() {
      $.ajax({
          url : '/logout',
          type: 'POST',
          success: overwritePage
      });
  });

  // Load Lists
  lists_get(function (result, status, xhr) {
    var lists = result.lists;
    for (var i = 0; i != lists.length; i ++ ) {
      list_add(lists[i].title, lists[i]._id);
    }
  });

  // Fetch Tasks When List Selected
  $('.item_list').click(function (event) {
    tasks_clear(); // clear task list
    var selected = event.currentTarget;
    var listid = selected.id;
    // Retrieve and Display
    reloadTasks(listid);
  });
});

function reloadTasks(listid) {
  list_get_filter(listid, "completed=0", function (result, status, xhr) {
    var tasks = result.tasks;
    for (var i = 0; i < tasks.length; i++) {
      tasks[i] = {"task": tasks[i]};
    }
    $('#list_tasks').html(Handlebars.templates['tasks']({tasks: tasks}));
    attachJQuery();
  });
}