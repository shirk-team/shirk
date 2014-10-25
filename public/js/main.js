$(document).ready(function() {
    $('.button#logout').click(function() {
        $.ajax({
            url : '/logout',
            type: 'POST',
            success: overwritePage
        });
    });
});