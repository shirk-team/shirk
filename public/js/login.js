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
        }
    });
});

/**
 * Check if a required field has been provided.
 * @param  {String} field The name and id of the field to check.
 * @return {String} The current value of the field.
 */
function checkField(field) {
    var input = $('#' + field + '-input').val();
    if (input  === '') {
        showError(field, field + ' required');
    }
    return input;
}

/**
 * Make a user-related AJAX POST request (login or signup). If the request
 * is successful, replaces the page's contents with the page returned by the
 * server.
 * @param  {String} username  The username of the user affected by the request.
 * @param  {String} password  The password of the user affected by the request.
 * @param  {String} url       The URL to post to.
 * @param  {Function} onError A handler for if the server returns an error.
 */
function userAJAX(username, password, url, onError) {
    $.ajax({
        url: url,
        data: {
            username: username,
            password: password
        },
        success: overwritePage,
        error: onError,
        type: 'POST'
    });
}
/**
 * Create a new user account. If the username is already taken, show an
 * error message. Otherwise, log the user in.
 * @param  {String} username The username of the new account.
 * @param  {String} password The password for the new account.
 */
function signup(username, password) {
    userAJAX(username, password, '/users/', function(xhr, status, error) {
        if (xhr.responseText.indexOf('dup key') !== -1) {
            showError('username', 'username taken');
        }
    });
}

/**
 * Log the user in. If the username or password are incorrect, show an error
 * message.
 * @param  {String} username The username of the account to log into.
 * @param  {String} password The password for the account to log into.
 */
function login(username, password) {
    userAJAX(username, password, '/login', function(xhr, status, error) {
        if (xhr.responseText === 'Incorrect username') {
            showError('username', 'incorrect username');
        } else if (xhr.responseText === 'Incorrect password') {
            showError('password', 'incorrect password');
        } else {
            throw new Error(xhr.responseText);
        }
    });
}

/**
 * Show an error message on an input field.
 * @param  {String} field   The id of the field to show the error on.
 * @param  {String} message The error message to show.
 */
function showError(field, message) {
    var elt = $('#' + field);
    $(elt).addClass('error');
    $(elt).append('<div class="ui red pointing label">' + message + '</div>');
}