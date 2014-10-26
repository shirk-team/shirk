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
    list_get_filter(listid, "completed=0", function (result, status, xhr) {
      $("#task-list-title-input").val(result.list.title); // list title
      $(".list_header").show(0);
      var tasks = result.tasks;

      if (tasks.length == 0)
        message_show("Empty List", "There are not tasks in this list to display.");
      else
        message_hide();

      for (var i = 0; i != tasks.length; i ++ ) {
        var task = tasks[i];
        task_add(task.title, task._id, task.priority, task.deadline, task.notes);
      }
    });
  });
});

// TODO(tdivita): Listener for Task Add Button

