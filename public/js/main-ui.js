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
  var item = create_elem("div", listid, "item item_list");
  var content = create_elem("div", "", "content");
  var header = create_elem("div", "", "header");
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

$(document).ready(function () {
  // Logout Label
  $('.button#logout').popup({content: "Logout", position: "bottom center"});
});