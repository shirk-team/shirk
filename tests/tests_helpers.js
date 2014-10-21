/**
 * Helper functions for automated tests.
 * @author aandre@mit.edu, seropian@mit.edu
*/

////////////////////////////
// Authentication Helpers //
////////////////////////////

function errorHandler (xhr, status, error) {
    console.log(xhr, status, error);
}

function login (username, password) {
    $.ajax({
        url : '/login',
        type: 'POST',
        async: false,
        data : {
            username: username,
            password: password
        },
        success: function() {
            console.log("LOGIN - " + username);
        },
        error: errorHandler
    });
}

function logout () {
    $.ajax({
        url : '/logout',
        type: 'POST',
        async: false,
        success: function() {
            console.log("LOGOUT");
        },
        error: errorHandler
    });
}

function clear_user() {
    $.ajax({
        url : '/clear',
        type: 'POST',
        async: false,
        success: function() {
            console.log("CLEAR USER");
        },
        error: errorHandler
    });
}

function clear_all() {
    $.ajax({
        url : '/clearAll',
        type: 'POST',
        async: false,
        success: function() {
            console.log("CLEAR ALL");
        },
        error: errorHandler
    });
}

//////////////////////////
// User Request Helpers //
//////////////////////////
function user_create(username, password) {
    var data;
    $.ajax({
        url : '/users/',
        type: 'POST',
        async: false,
        contentType: "application/json",
        data: JSON.stringify({"username": username, "password": password}),
        success: function (result, status, xhr) {
            data = result;
        },
        error: errorHandler
    });
    return data;
}

//////////////////////////
// List Request Helpers //
//////////////////////////
function lists_get() {
    var data;
    $.ajax({
        url : '/lists/',
        type: 'GET',
        async: false,
        success: function (result, status, xhr) {
            data = result;
        },
        error: errorHandler
    });
    return data;
}

function list_create(name) {
    var data;
    $.ajax({
        url : '/lists/',
        type: 'POST',
        async: false,
        contentType: "application/json",
        data: JSON.stringify({"list": {"title": name}}),
        success: function (result, status, xhr) {
            data = result;
        },
        error: errorHandler
    });
    return data;
}

function list_get(listid) {
    var data;
    $.ajax({
        url : '/lists/' + listid,
        type: 'GET',
        async: false,
        success: function (result, status, xhr) {
            data = result;
        },
        error: errorHandler
    });
    return data;
}

function list_rename(listid, name) {
    var data;
    $.ajax({
        url : '/lists/' + listid,
        type: 'PUT',
        async: false,
        contentType: "application/json",
        data: JSON.stringify({list: {title: name}}),
        success: function (result, status, xhr) {
            data = result;
        },
        error: errorHandler
    });
    return data;
}

function list_delete(listid) {
    var data;
    $.ajax({
        url : '/lists/' + listid,
        type: 'DELETE',
        async: false,
        success: function (result, status, xhr) {
            data = result;
        },
        error: errorHandler
    });
    return data;
}

//////////////////////////
// Task Request Helpers //
//////////////////////////
function tasks_get() {
    var data;
    $.ajax({
        url : '/tasks/',
        type: 'GET',
        async: false,
        success: function (result, status, xhr) {
            data = result;
        },
        error: errorHandler
    });
    return data;
}

function task_create(task) {
    var data;
    $.ajax({
        url : '/tasks/',
        type: 'POST',
        async: false,
        contentType: "application/json",
        data: JSON.stringify({task: task}),
        success: function (result, status, xhr) {
            data = result;
        },
        error: errorHandler
    });
    return data;
}

function task_get(taskid) {
    var data;
    $.ajax({
        url : '/tasks/' + taskid,
        type: 'GET',
        async: false,
        success: function (result, status, xhr) {
            data = result;
        },
        error: errorHandler
    });
    return data;
}

function task_replace(taskid, task) {
    var data;
    $.ajax({
        url : '/tasks/' + taskid,
        type: 'PUT',
        async: false,
        contentType: "application/json",
        data: JSON.stringify({task: task}),
        success: function (result, status, xhr) {
            data = result;
        },
        error: errorHandler
    });
    return data;
}

function task_delete(taskid) {
    var data;
    $.ajax({
        url : '/tasks/' + taskid,
        type: 'DELETE',
        async: false,
        success: function (result, status, xhr) {
            data = result;
        },
        error: errorHandler
    });
    return data;
}