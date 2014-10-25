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