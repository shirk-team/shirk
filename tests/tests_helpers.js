/**
 * Helper functions for automated tests.
 * @author aandre@mit.edu
*/


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
        async: false
    });
}

//////////////////////////
// List Request Helpers //
//////////////////////////
function lists_get() {
    $.ajax({
        url : '/lists/',
        type: 'GET',
        async: false,
        success: function (result, status, xhr) {
            return result;
        }
    });
}

function list_create(name) {
    $.ajax({
        url : '/lists/',
        type: 'POST',
        async: false,
        data: {list: {title: name}},
        success: function (result, status, xhr) {
            return result;
        }
    });
}

function list_get(listid) {
    $.ajax({
        url : '/lists/' + listid,
        type: 'GET',
        async: false,
        success: function (result, status, xhr) {
            return result;
        }
    });
}

function list_rename(listid, name) {
    $.ajax({
        url : '/lists/' + listid,
        type: 'PUT',
        async: false,
        data: {list: {title: name}},
        success: function (result, status, xhr) {
            return result;
        }
    });
}

function list_delete(listid) {
    $.ajax({
        url : '/lists/' + listid,
        type: 'DELETE',
        async: false,
        success: function (result, status, xhr) {
            return result;
        }
    });
}

//////////////////////////
// Task Request Helpers //
//////////////////////////
function tasks_get() {
    $.ajax({
        url : '/tasks/',
        type: 'GET',
        async: false,
        success: function (result, status, xhr) {
            return result;
        }
    });
}

function task_create(task) {
    $.ajax({
        url : '/tasks/',
        type: 'POST',
        async: false,
        data: {task: task},
        success: function (result, status, xhr) {
            return result;
        }
    });
}

function task_get(taskid) {
    $.ajax({
        url : '/tasks/' + taskid,
        type: 'GET',
        async: false,
        success: function (result, status, xhr) {
            return result;
        }
    });
}

function task_replace(taskid, task) {
    $.ajax({
        url : '/tasks/' + taskid,
        type: 'PUT',
        async: false,
        data: {task: task},
        success: function (result, status, xhr) {
            return result;
        }
    });
}

function task_delete(taskid) {
    $.ajax({
        url : '/tasks/' + taskid,
        type: 'DELETE',
        async: false,
        success: function (result, status, xhr) {
            return result;
        }
    });
}