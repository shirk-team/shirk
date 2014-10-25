$(document).ready(function() {
    $('#logout').click(function() {
        $.ajax({
            url : '/logout',
            type: 'POST',
            success: overwritePage
        });
    });
});