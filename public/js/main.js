Handlebars.registerPartial('tasks', Handlebars.templates['tasks']);
Handlebars.registerPartial('task', Handlebars.templates['task']);

var saveNotes = Handlebars.compile($("#save-notes-template").html());
var saveDeadline = Handlebars.compile($("#save-deadline-template").html());

Handlebars.registerHelper('saveNotes', function(task) {
  return saveNotes({task: task});
});

Handlebars.registerHelper('saveDeadline', function(task) {
  return saveDeadline({task: task});
});

////////////////////////
// Reload List/Filter //
// Author: aandre     //
////////////////////////

// Reload the list, and redisplay all its associated tasks
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

// Reload the filter, and redisplay all its associated tasks
function reloadFilter(filterid) {
  // synthesize filter query
  var query_string;
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  switch(filterid) {
    case "filter_shirked":
      endDate.setDate(endDate.getDate() - 1);
      query_string = "completed=0&endDate=\"" + endDate.toString() + "\"";
      break;
    case "filter_today":
      query_string = "completed=0&endDate=\"" + today.toString() + "\"&startDate=\"" + today.toString() + "\"";
      break;
    case "filter_next7":
      endDate.setDate(endDate.getDate() + 7);
      query_string = "completed=0&startDate=\"" + today.toString() + "\"&endDate=\"" + endDate.toString() + "\"";
      break;
    case "filter_next30":
      endDate.setDate(endDate.getDate() + 30);
      query_string = "completed=0&startDate=\"" + today.toString() + "\"&endDate=\"" + endDate.toString() + "\"";
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

///////////////////////////////////////////////////////////////////////////////

////////////////////
// READY FUNCTION //
////////////////////

$(document).ready(function() {

  ///////////
  // Inits //
  ///////////

  // Load Lists
  lists_get(function (result, status, xhr) {
    var lists = result.lists;
    for (var i = 0; i != lists.length; i ++ ) {
      list_add(lists[i].title, lists[i]._id);
    }
  });

  // Welcome Message
  message_show("No List Selected", "Select a list or filter to view its tasks, or create a new list.");
  $('.button#logout').click(function() {
      $.ajax({
          url : '/logout',
          type: 'POST',
          success: overwritePage
      });
  });

  ///////////////
  // Listeners //
  ///////////////

  /**
   * Author: aandre
   */

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

  /**
   * Author: tdivita
   */

  // Popup for Add List
  $('#add-list').popup({
    on: "click",
    position: "bottom center"
  });

  // Modal for Add Task
  $(document).on("click", "#add-task", function(event){
    $("#task-add-modal").modal("show");
  });

  // New Task - Priority
  $(document).on("click", ".create-priority-button", function(event) {
    var clickedId = event.currentTarget.id;
    var button = $("#" + clickedId);
    // Make the clicked button active, and the others inactive
    button.toggleClass("active");
    var priorityButtons = ["high-priority", "neutral-priority", "low-priority"];
    priorityButtons.forEach(function(buttonName) {
      if (buttonName !== clickedId) {
        $("#" + buttonName).removeClass("active");
      }
    });
  });

  // New List - Save
  $(document).on("click", "#new-list-save", function() {
    var title = $("#new-list-title").val();
    if (!title) {
      message_show("Cannot Set Empty List Title", "The list must have a non-empty name.", true);
    }
    list_create(title, function(result, status, xhr) {
      list_add(result.list.title, result.list._id);
      $("#add-list").popup("hide");
    });
  });

  // New Task - Save
  $(document).on("click", "#new-task-save", function() {
    var submit = true;

    // Pull all the input from the modal
    
    var title = $("#new-task-title").val();
    if (title == '') {
      $('#new-task-title-field').addClass('error');
      submit = false;
    } else {
      $('#new-task-title-field').removeClass('error');
    }

    var notes = $("#new-task-notes").val();
    var listid = list_selected_get();

    var newDeadline = $("#new-task-deadline").val();
    var deadline = new Date(newDeadline);
    // Check that new deadline is valid; only set valid deadlines
    if (!/\d{1,2}\/\d{1,2}\/\d{4}/.test(newDeadline) || deadline == 'Invalid Date' && newDeadline !== '') {
      $("#new-task-deadline-field").addClass('error');
      submit = false;
    } else {
      $("#new-task-deadline-field").removeClass('error');
    }

    var selectedButton = $("#new-task-priority .active").first().attr('id');

    // Determine the selected priority level
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

    if (submit) {
      // Create the new task object
      var newTask = {
        "title": title,
        "notes": notes,
        "list": listid,
        "deadline": deadline,
        "priority": priority
      }

      task_create(newTask, function(result, status, xhr) {
        // Close the modal
        $('#task-add-modal').modal('hide');

        // Clear the modal
        $("#new-task-title").val("");
        $("#new-task-notes").val("");
        $("#new-task-deadline").val("");
        $("#new-task-title").val("");
        $("#high-priority").removeClass("active");
        $("#low-priority").removeClass("active");
        $("#neutral-priority").addClass("active");

        // Reload the list so it has the new task
        var listid = list_selected_get();
        reloadList(listid);
      });
    }
  });

  // List - Rename
  $('#list-title-save').click(function(event){
    var listid = list_selected_get();
    var newTitle = $("#task-list-title-input").val();

    // Lists must have titles
    if (!newTitle) {
      message_show("Cannot Set Empty List Title", "The list must have a non-empty name.", true);
      // Reset to show the old title again
      var oldTitle = $("#" + listid + " .header").html();
      $("#task-list-title-input").val(oldTitle);
    }

    list_put(newTitle, listid, function(result, status, xhr) {
      // Update the title in the sidebar list of lists
      list_rename(result.list.title, listid);
    });
  });

  /**
   * Author: seropian
   */

  // List - Revert Rename
  $("#task-list-title").blur(function() {
    var listid = list_selected_get();
    var oldTitle = $("#" + listid + " .header").html();
    $("#task-list-title-input").val(oldTitle);
  });
});
