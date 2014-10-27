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

  // Welcome Message
  message_show("No List Selected", "Select a list or filter to view its tasks, or create a new list.");

  // Fetch Tasks When List Selected
  $('.item_list').click(function (event) {
    tasks_clear(); // clear task list
    var selected = event.currentTarget;
    var listid = selected.id;
    list_select(listid); // highlight selected
    // Retrieve and Display
    reloadTasks(listid);
  });
});

function reloadTasks(listid) {
  list_get_filter(listid, "completed=0", function (result, status, xhr) {
    $("#task-list-title-input").val(result.list.title); // list title
    $(".list_header").show(0);
    var tasks = result.tasks;

    if (tasks.length == 0)
      message_show("Empty List", "There are not tasks in this list to display.");
    else
      message_hide();

    for (var i = 0; i < tasks.length; i++) {
      tasks[i] = {"task": tasks[i]};
    }
    $('#list_tasks').html(Handlebars.templates['tasks']({tasks: tasks}));
    attachJQuery();
  });
}

// TODO(tdivita): Listener for Task Add Button
