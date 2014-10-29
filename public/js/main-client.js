//////////
// LIST //
//////////

/**
 * Author: aandre
 */

function lists_get(callback) {
  $.ajax({
    url : '/lists/',
    type: 'GET',
    success: callback // function (result, status, xhr)
  });
}

function list_get(listid, callback) {
  $.ajax({
    url : '/lists/' + listid,
    type: 'GET',
    success: callback
  });
}

function list_get_filter(listid, querystring, callback) {
  $.ajax({
    url : '/lists/' + listid + '?' + querystring.toString(),
    type: 'GET',
    success: callback
  });
}

/**
 * Author: tdivita
 */

function list_create(name, callback, errorcallback) {
  $.ajax({
    url : '/lists/',
    type: 'POST',
    contentType: "application/json",
    data: JSON.stringify({"list": {"title": name}}),
    success: callback,
    error: errorcallback
  });
}

function list_put(newName, listid, callback) {
  $.ajax({
    url : '/lists/' + listid,
    type: 'PUT',
    contentType: "application/json",
    data: JSON.stringify({list: {title: newName}}),
    success: callback
  });
}

function list_delete(listid, callback) {
  $.ajax({
    url: '/lists/' + listid,
    type: 'DELETE',
    success: callback
  });
}

//////////
// TASK //
//////////

/**
 * Author: aandre
 */

function tasks_get(callback) {
  $.ajax({
    url : '/tasks/',
    type: 'GET',
    success: callback
  });
}

function tasks_get_filter(querystring, callback) {
  $.ajax({
    url : '/tasks/?' + querystring.toString(),
    type: 'GET',
    success: callback
  });
}

function task_get(taskid, callback) {
  $.ajax({
    url : '/tasks/' + taskid,
    type: 'GET',
    success: callback
  });
}

/**
 * Author: tdivita
 */

function task_create(task, callback) {
    $.ajax({
        url : '/tasks/',
        type: 'POST',
        async: false,
        contentType: "application/json",
        data: JSON.stringify({"task": task}),
        success: callback
    });
}

/**
 * Author: seropian
 */

function task_put(taskid, data, callback) {
  $.ajax({
    url: '/tasks/' + taskid,
    type: 'PUT',
    contentType: "application/json",
    data: JSON.stringify(data),
    success: callback
  });
}

/**
 * Author: tdivita
 */

function task_delete(taskid, callback) {
  $.ajax({
    url: '/tasks/' + taskid,
    type: 'DELETE',
    success: callback
  });
}