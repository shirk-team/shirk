/////////////
// HELPERS //
/////////////

function create_elem(elem, id, classes) {
  var new_elem = $(document.createElement(elem));
  new_elem.attr('id', id);
  new_elem.addClass(classes);
  return new_elem;
}

///////////
// LISTS //
///////////

function list_add(title, listid) {
  var item = create_elem("div", listid, "item item_list"); // new row
  var content = create_elem("div", "", "content");
  var header = create_elem("div", "", "header"); // list title
  header.html(title);
  content.append(header);
  item.append(content);
  $('#list_lists').append(item);
}

function list_remove(listid) {
  $('.item_list#' + listid).remove();
}

///////////
// TASKS //
///////////

function tasks_clear() {
  $('#list_tasks').html("");
}

function task_add(title, taskid, priority, deadline, notes) {
  var item = create_elem("div", taskid, "item item_task"); // new row
  var icon = create_elem("i", "", "icon empty checkbox"); // checkbox
  var content = create_elem("div", "", "content"); // title
  content.html(title);
  item.append(icon);
  item.append(content);
  $('#list_tasks').append(item);
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

function message_show(msg) {
  $('#message-text').html(msg);
  $('#message-box').show(0);
}

function message_hide() {
  $('#message-box').hide(0);
  $('#message-text').html(""); // clear message
}


$(document).ready(function () {
  // Logout Label
  $('.button#logout').popup({content: "Logout", position: "bottom center"});

  // Hide Message
  message_hide();
});