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


  // List Selection
  $(document).on("click", ".item_list", function(event) {
    tasks_clear(); // clear task list
    var selected = event.currentTarget;
    var listid = selected.id;
    list_select(listid); // highlight selected
    // Retrieve and Display
    reloadList(listid);
  });

  // Filter Selection
  $(document).on("click", ".item_filter", function(event) {
    tasks_clear();
    var selected = event.currentTarget;
    var filterid = selected.id;
    filter_select(filterid); // highlight selected
    // Run Query and Display
    reloadFilter(filterid);
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

  // Treat the new task priority buttons as a group where only one can be selected at a time
  $(document).on("click", ".create-priority-button", function(event) {
    var clickedId = event.currentTarget.id;
    var button = $("#" + clickedId);
    button.toggleClass("active");
    var priorityButtons = ["high-priority", "neutral-priority", "low-priority"];
    priorityButtons.forEach(function(buttonName) {
      if (buttonName !== clickedId) {
        $("#" + buttonName).removeClass("active");
      }
    });
  });

  // When the new list save button is clicked, create the new list and add it to the UI
  $(document).on("click", "#new-list-save", function() {
    var title = $("#new-list-title").val();
    list_create(title, function(result, status, xhr) {
      list_add(result.list.title, result.list._id);
      $("#add-list").popup("hide");
    });
  });

  // When the new task save button is clicked, create the new task and add it to the UI
  $(document).on("click", "#new-task-save", function() {
    var title = $("#new-task-title").val();
    var notes = $("#new-task-notes").val();
    var listid = list_selected_get();

    var deadlineInput = $("#new-task-deadline").val();
    var deadline = undefined;
    if (deadlineInput) deadline = deadlineInput;

    var selectedButton = $("#new-task-priority .active").first().attr('id');
    console.log(selectedButton);

    var priority;
    switch(selectedButton) {
      case "high-priority":
        priority = 1;
        break;
      case "neutral-priority": 
        priority = 0;
        break;
      case "low-priority": 
        priority = -1;
        break;
    }

    var newTask = {
      "title": title,
      "notes": notes,
      "list": listid,
      "deadline": deadline,
      "priority": priority
    }

    task_create(newTask, function(result, status, xhr) {
      $("#add-task").popup("hide");
      var listid = list_selected_get();
      reloadList(listid);
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

function reloadList(listid) {
  list_get(listid, function (result, status, xhr) {
    $("#task-list-title-input").val(result.list.title); // list title
    $(".list_header").show(0);
    var tasks = result.tasks;

    if (tasks.length == 0)
      message_show("No Tasks", "There are no tasks in this list to display.");
    else
      message_hide();

    displayTasks(tasks);
  });
}

function reloadFilter(filterid) {
  // synthesize filter query
  var query_string;
  var today = new Date();
  var endDate = new Date();
  switch(filterid) {
    case "filter_shirked":
      endDate.setDate(endDate.getDate() - 1);
      query_string = "completed=0&endDate=" + endDate.toString();
      break;
    case "filter_today":
      query_string = "completed=0&endDate=" + today.toString() + "&startDate=" + today.toString();
      break;
    case "filter_next7":
      endDate.setDate(endDate.getDate() + 7);
      query_string = "completed=0&startDate=" + today.toString() + "&endDate=" + endDate.toString();
      break;
    case "filter_next30":
      endDate.setDate(endDate.getDate() + 30);
      query_string = "completed=0&startDate=" + today.toString() + "&endDate=" + endDate.toString();
      break;
    case "filter_completed":
      query_string = "completed=1";
      break;
    default:
      query_string = "completed=0";
      break;
  }

  $(".list_header").hide(0); // hide title and new

  tasks_get_filter(query_string, function (result, status, xhr) {
    var tasks = result.tasks;

    if (tasks.length == 0)
      message_show("No Tasks", "There are no tasks that meet this filter's criteria.");
    else
      message_hide();

    displayTasks(tasks);
  });
}
