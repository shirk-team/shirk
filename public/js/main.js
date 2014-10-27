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
  $(document).on("click", ".item_list", function(event) {
    tasks_clear(); // clear task list
    var selected = event.currentTarget;
    var listid = selected.id;
    list_select(listid); // highlight selected
    // Retrieve and Display
    reloadTasks(listid);
  });

  // When the add list button is clicked, display a list creation popup
  $('#add-list').popup({
    on: "click",
    position: "bottom center"
  });

  // When the add task button is clicked, display a task creation popup
  $('#add-task').popup({
    on: "click",
    position: "bottom center"
  });

  // When the new list save button is clicked, create the new task and add it to the UI
  $(document).on("click", "#new-list-save", function() {
    var title = $("#new-list-title").val();
    list_create(title, function(result, status, xhr) {
      list_add(result.list.title, result.list._id);
      $("#add-list").popup("hide");
    });
  });

  // When the list title save button is clicked, save the title and update it in the display
  $('#list-title-save').click(function(event){
    var listid = list_selected_get();
    var newTitle = $("#task-list-title-input").val();

    list_put(newTitle, listid, function(result, status, xhr) {
      // Update the title in the sidebar list of lists
      $("#" + listid + " .header").html(result.list.title);
    });
  });

  // If the user clicks out of the edit box without saving, reset the title to what it was
  /*
  * TODO(tdivita): This is broken and needs to be fixed. It works except for that it looks
  * for the wrong thing losing focus. Looking at the input doesn't work because then you
  * can't click save with your new title.
  */
  $("#task-list-title").blur(function() {
    var listid = list_selected_get();
    var oldTitle = $("#" + listid + " .header").html();
    $("#task-list-title-input").val(oldTitle);
  });
});

function reloadTasks(listid) {
  list_get_filter(listid, "completed=0", function (result, status, xhr) {
    $("#task-list-title-input").val(result.list.title); // list title
    $(".list_header").show(0);
    var tasks = result.tasks;

    if (tasks.length == 0)
      message_show("Empty List", "There are no tasks in this list to display.");
    else
      message_hide();

    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].deadline) {
        tasks[i].deadline = new Date(tasks[i].deadline).toLocaleDateString();
      }
      tasks[i] = {"task": tasks[i]};
    }
    $('#list_tasks').html(Handlebars.templates['tasks']({tasks: tasks}));
    attachJQuery();
  });
}
