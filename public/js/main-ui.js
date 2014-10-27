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

function list_rename(title, listid) {
  // TODO(tdivita)
}

function list_remove(listid) {
  $('.item_list#' + listid).remove();
}

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

// TODO(tdivita): Task Add Button Behaviors

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

function message_show(title, message) {
  $('#message-title').html(title);
  $('#message-text').html(message);
  $('#message-box').show(0);
}

function message_hide() {
  $('#message-box').hide(0);
  $('#message-title').html(""); // clear title
  $('#message-text').html(""); // clear message
}

// Render Tasks into Task Pane
function displayTasks(tasks) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].deadline) {
      tasks[i].deadline = new Date(tasks[i].deadline).toLocaleDateString();
    }
    tasks[i] = {"task": tasks[i]};
  }
  $('#list_tasks').html(Handlebars.templates['tasks']({tasks: tasks}));
  attachJQuery();
}

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
        $(this).addClass('icon square up ui dropdown edit-priority pointing');
        break;
      case 0:
        $(this).addClass('icon square circle blank ui dropdown edit-priority pointing');
        break;
      case -1:
        $(this).addClass('icon square down ui dropdown edit-priority pointing');
        break;
    }
  }});

  var priorityDropdown = $('.edit-priority');
  switch(priorityDropdown.attr('priority')) {
    case '1':
      priorityDropdown.addClass('up');
      break;
    case '0':
      priorityDropdown.addClass('circle blank');
      break;
    case '-1':
      priorityDropdown.addClass('down');
      break;
  }

  $(document).on('click', '.save-notes', function() {
    var newNotes = $(this).siblings().val();

    if (newNotes == '') {
      $(this).removeClass('black inverted');
    } else {
      $(this).addClass('black inverted');
    }

    var id = $(this).attr('task');

    // TODO: error handling
    task_put(id, {task: {task_id: id, notes: newNotes}});

    $('#' + id + ' .edit-notes').popup('hide');
    reloadList(list_selected_get());
  });

  $(document).on('click', '.save-deadline', function() {
    var newDeadline = $(this).siblings().val();
    var id = $(this).attr('task');

    // TODO: error handling
    task_put(id, {task: {task_id: id, deadline: new Date(newDeadline)}});

    $('#' + id + ' .edit-deadline').popup('hide');
    reloadList(list_selected_get());
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