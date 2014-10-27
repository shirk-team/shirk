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
  $('.item_list').click(function (event) {
    tasks_clear(); // clear task list
    var selected = event.currentTarget;
    var listid = selected.id;
    list_select(listid); // highlight selected
    // Retrieve and Display
    reloadTasks(listid);
  });

  // Filter Selection
  $('.item_filter').click(function (event) {
    tasks_clear();
    var selected = event.currentTarget;
    var filterid = selected.id;
    filter_select(filterid); // highlight selected
    // Run Query and Display
    reloadFilter(filterid);
  });

  // When the add list button is clicked, display a list creation popup
  $('#add-list').popup({
    inline: true,
    on: "click",
    position: "bottom center"
  });

  // When the add task button is clicked, display a task creation popup
  $('#add-task').popup({
    inline: true,
    on: "click",
    position: "bottom center"
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
  // TODO(tdivita): This is broken and needs to be fixed.
  $("#task-list-title").blur(function() {
    var listid = list_selected_get();
    var oldTitle = $("#" + listid + " .header").html();
    $("#task-list-title-input").val(oldTitle);
  });
});

// TODO: refactor to reloadLists
function reloadTasks(listid) {
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
    default:
      query_string = "completed=0";
      break;
  }
  console.log(query_string);

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
