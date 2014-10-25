$(document).ready(function() {
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

function checkField(field) {
    var elt = '#' + field;
    var input = $(elt + '-input').val();
    if (input  === '') {
        $(elt).addClass('error');
        $(elt).append('<div class="ui red pointing label">' + field + ' Required</div>');
    }
    return input;
}