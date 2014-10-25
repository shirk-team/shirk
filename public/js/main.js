$(document).ready(function() {
    $('#logout').click(function() {
        $.ajax({
            url : '/logout',
            type: 'POST',
            success: function(data, status, xhr) {
                var doc = document.open('text/html', 'replace');
                doc.write(data);
                doc.close();
            }
        });
    });
})