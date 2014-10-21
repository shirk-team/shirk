/**
 * Helper functions for automated tests.
 * @author aandre@mit.edu
*/

// $.ajaxSetup({
//     contentType: "application/json",
//     dataType: "json"
// });

////////////////////////////
// Authentication Helpers //
////////////////////////////
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
        }
    });
}

function logout () {
    $.ajax({
        url : '/logout',
        type: 'POST',
        async: false,
        success: function() {
            console.log("LOGOUT");
        }
    });
}

function clear_all() {
    $.ajax({
        url : '/clear',
        type: 'POST',
        async: false,
        success: function() {
            console.log("CLEAR");
        }
    });
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
        }
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
        }
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
        }
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
        }
    });
    return data;
}

function list_delete(listid) {
    var data, code;
    $.ajax({
        url : '/lists/' + listid,
        type: 'DELETE',
        async: false,
        success: function (result, status, xhr) {
            data = result;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            code = jqXHR.status;
        }
    });
    return {data: data, status: code};
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
        }
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
        }
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
        }
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
        }
    });
    return data;
}

function task_delete(taskid) {
    var data, code;
    $.ajax({
        url : '/tasks/' + taskid,
        type: 'DELETE',
        async: false,
        success: function (result, status, xhr) {
            data = result;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            code = jqXHR.status;
        }
    });
    return {data: data, status: code};
}