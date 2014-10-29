/**
 * Author: aandre
 */

/////////////
// HELPERS //
/////////////

function create_elem(elem, id, classes) {
  var new_elem = $(document.createElement(elem));
  new_elem.attr('id', id);
  new_elem.addClass(classes);
  return new_elem;
}

/////////////
// FILTERS //
/////////////

function filter_select(filterid) {
  $('.selected_list').removeClass('selected_list'); // clear list selection
  $('.selected_filter').removeClass('selected_filter'); // clear list selection
  $('.item_filter#' + filterid).addClass('selected_filter');
}

///////////
// LISTS //
///////////

function list_add(title, listid) {
  var item = create_elem("div", listid, "item item_list"); // new row
  var content = create_elem("div", "", "content ui column grid middle aligned full-width");
  var header = create_elem("span", "", "header column fifteen wide no-margin"); // list title
  var deleteButton = create_elem("i", "", "icon remove delete-list column one wide no-margin hidden");
  header.html(title);
  content.append(header);
  content.append(deleteButton);
  item.append(content);

  item.hover(function() {
    deleteButton.css({visibility: 'visible'});
  }, function() {
    deleteButton.css({visibility: 'hidden'});
  });

  deleteButton.click(function(event) {
    // TODO: error handling
    list_delete(listid);
    item.remove();
    event.stopPropagation();
  });

  $('#list_lists').append(item);
}

/**
 * Author: tdivita
 */

function list_rename(title, listid) {
  $("#" + listid + " .header").html(title);
}

function list_remove(listid) {
  $('.item_list#' + listid).remove();
}

/**
 * Author: aandre
 * Smaller Parts: tdivita
 */

function list_select(listid) {
  $('.selected_list').removeClass('selected_list'); // clear list selection
  $('.selected_filter').removeClass('selected_filter'); // clear list selection
  $('.item_list#' + listid).addClass('selected_list');
}

function list_selected_get() {
  return $('.selected_list').first().attr('id');
}

///////////
// TASKS //
///////////

function tasks_clear() {
  $('#list_tasks').html("");
}

function task_status(taskid, complete) {
  var item = $('.item_task#' + taskid); // select row
  var icon = item.children("i.icon").first(); // checkbox
  var content = item.children("div.content").first(); // title text
  if (complete) {
    icon.removeClass("empty");
    icon.addClass("checked");
    content.css("text-decoration", "line-through");
  } else {
    icon.removeClass("checked");
    icon.addClass("empty");
    content.css("text-decoration", "none");
  }
}

function task_remove(taskid) {
  $('.item_task#' + taskid).remove();
}

function message_show(title, message, isError) {
  // Clear any existing messages and formatting
  message_hide()
  // Display new message
  $('#message-title').html(title);
  $('#message-text').html(message);
  $('#message-box').show(0);
  if (isError) {
    $('#message-box').addClass("red");
  }
}

function message_hide() {
  $('#message-box').hide(0);
  $('#message-title').html(""); // clear title
  $('#message-text').html(""); // clear message
  $('#message-box').removeClass("red"); // remove error coloring
}

// Render Tasks into Task Pane
function displayTasks(tasks) {
  var tasks_scheduled = [],
      tasks_unscheduled = [],
      tasks_completed = [];

  for (var i = 0; i < tasks.length; i++) {
    // format date
    if (tasks[i].deadline) {
      var deadline = new Date(tasks[i].deadline);
      var today = new Date();
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (deadline.toDateString() === today.toDateString()) // today
        tasks[i].deadlineString = "Today";
      else if (deadline.toDateString() === tomorrow.toDateString()) // tomorrow
        tasks[i].deadlineString = "Tomorrow";
      else if (deadline.valueOf() <= today.valueOf()) // overdue
        tasks[i].deadlineString = moment(deadline).startOf('day').fromNow();
      else // future
        tasks[i].deadlineString = moment(deadline).format("ddd, MMM D YYYY");
      tasks[i].deadline = deadline.toLocaleDateString();
    }

    // append task to group
    if (tasks[i].completed) // completed
      tasks_completed.push({"task": tasks[i]});
    else if (tasks[i].deadline) // scheduled
      tasks_scheduled.push({"task": tasks[i]});
    else // unscheduled
      tasks_unscheduled.push({"task": tasks[i]});
  }

  // sort scheduled tasks by date
  tasks_scheduled.sort( function(a,b) {
    return ((new Date(a.task.deadline)).getTime() - (new Date(b.task.deadline)).getTime());
  });

  // sort unscheduled tasks by priority
  tasks_unscheduled.sort( function(a,b) {
    return -(a.task.priority - b.task.priority);
  });

  tasks = tasks_scheduled.concat(tasks_unscheduled, tasks_completed); // ordering
  $('#list_tasks').html(Handlebars.templates['tasks']({tasks: tasks}));
  attachJQuery();
}

  /**
   * Author: seropian
   * Smaller Parts: tdivita
   */

function attachJQuery() {
  $('.checkbox').click(function() {
    $(this).toggleClass('checked');
    var complete = $(this).hasClass('checked');

    var id = $(this).attr('task');
    // TODO: error handling
    task_put(id, {task: {task_id: id, completed: complete}});

    if (complete) {
      $('#' + id).addClass('complete');
    } else {
      $('#' + id).removeClass('complete');
    }
  });

  // Attach popups to edit buttons
  $('.popup-button').popup({
    position:"bottom center",
    on: "click"
  });

  $('.ui.dropdown.edit-priority').dropdown({onChange: function(value, text) {
    var id = $(this).attr('task');

    // TODO: error handling
    task_put(id, {task: {task_id: id, priority: value}});

    $(this).removeClass();
    switch(value) {
      case 1:
        $(this).addClass('icon square up ui dropdown edit-priority pointing black inverted');
        break;
      case 0:
        $(this).addClass('icon square circle blank ui dropdown edit-priority pointing');
        break;
      case -1:
        $(this).addClass('icon square down ui dropdown edit-priority pointing black inverted');
        break;
    }
  }});

  $('.edit-priority').each(function() {
    switch($(this).attr('priority')) {
      case '1':
        $(this).addClass('up black inverted');
        break;
      case '0':
        $(this).addClass('circle blank');
        break;
      case '-1':
        $(this).addClass('down black inverted');
        break;
    }
  });

  $(document).on('click', '.save-notes', function() {
    // Do not allow a blank new title. Undefined will not overwrite the current title.
    var newTitle = $(this).siblings('.task-title-edit-field').val() || undefined;
    var newNotes = $(this).siblings('.task-notes-edit-field').val();

    // Button is darker if notes are provided
    if (newNotes == '') {
      $(this).removeClass('black inverted');
    } else {
      $(this).addClass('black inverted');
    }

    var id = $(this).attr('task');

    // TODO: error handling
    task_put(id, {task: {task_id: id, title: newTitle, notes: newNotes}});

    $('#' + id + ' .edit-notes').popup('hide');
    reloadList(list_selected_get());
  });

  $(document).on('click', '.save-deadline', function() {
    var newDeadline = $(this).siblings().find('.date').val();

    // Button is darker if deadline is set
    if (newDeadline == '') {
      $(this).removeClass('black inverted');
    } else {
      $(this).addClass('black inverted');
    }

    var id = $(this).attr('task');

    var deadline = new Date(newDeadline);
    // Check that new deadline is valid; only set valid deadlines
    if (!/\d{1,2}\/\d{1,2}\/\d{4}/.test(newDeadline) || deadline == 'Invalid Date' && newDeadline !== '') {
      $(this).parents('.deadline-input').addClass('error')
    } else {
      $(this).parents('.deadline-input').removeClass('error');

      task_put(id, {task: {task_id: id, deadline: deadline}});

      $('#' + id + ' .edit-deadline').popup('hide');
      reloadList(list_selected_get());
    }
  });

  $(document).on('click', '.delete-task', function() {
    var id = $(this).attr('task');
    task_delete(id, function(result, status, xhr) {
      task_remove(id);
    });
  });
}

$(document).ready(function () {
  // Logout Label
  $('.button#logout').popup({content: "Logout", position: "bottom center"});

  // Hide Message
  message_hide();

  // Hide List Headers (Add and Title)
  $(".list_header").hide(0);
});