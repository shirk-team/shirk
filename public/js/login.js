$(document).ready(function() {
    /**
     * Check if all required fields are filled out. If so, send a login/signup
     * request to the server, depending on which button was clicked.
     */
    $('.button').click(function() {
        // Clear errors from previous login/signup attempts
        $('.ui.red.pointing.label').remove();
        $('.error').removeClass('error');

        var username = checkField('username');
        var password = checkField('password');

        if (username && password) {
            if ($(this).text() === 'Signup') {
                signup(username, password);
            } else {
                login(username, password)
            }
            // TODO: ajax
        }
    });
});

/**
 * Check if a required field has been provided.
 * @param  {String} field The name and id of the field to check.
 * @return {String} The current value of the field.
 */
function checkField(field) {
    var elt = '#' + field;
    var input = $(elt + '-input').val();
    if (input  === '') {
        $(elt).addClass('error');
        $(elt).append('<div class="ui red pointing label">' + field +
            ' Required</div>');
    }
    return input;
}

function signup(username, password) {
    $.ajax({
        url: '/users/',
        data: {
            username: username,
            password: password
        },
        success: function(data, status, xhr) {
            console.log('SUCCESS');
            console.log(data);
            console.log(status);
            console.log(xhr);
        },
        error: function(xhr, status, error) {
            console.log('ERROR');
            console.log(xhr);
            console.log(status);
            console.log(error);
        },
        type: 'POST'
    });
}

function login(username, password) {
    $.ajax({
        url: '/login',
        data: {
            username: username,
            password: password
        },
        success: function(data, status, xhr) {
            var doc = document.open('text/html', 'replace');
            doc.write(data);
            doc.close();
        },
        error: function(xhr, status, error) {
            if (xhr.responseText === 'Incorrect username') {
                $('#username').addClass('error');
                $('#username').append('<div class="ui red pointing label">Incorrect Username</div>');
            } else if (xhr.responseText === 'Incorrect password') {
                $('#password').addClass('error');
                $('#password').append('<div class="ui red pointing label">Incorrect Password</div>');
            } else {
                throw new Error(xhr.responseText);
            }
        },
        type: 'POST'
    });
}