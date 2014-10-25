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
  var item = create_elem("div", listid, "item list");
  var content = create_elem("div", "", "content");
  var header = create_elem("div", "", "header");
  header.html(title);
  content.append(header);
  item.append(content);
  $('#lists').append(item);
}

function list_remove(listid) {
  $('.list#' + listid).remove();
}

///////////
// TASKS //
///////////

$(document).ready(function () {

});