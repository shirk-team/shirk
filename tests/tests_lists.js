/**
 * Automated tests for Lists.
 * @author aandre@mit.edu, seropian@mit.edu
*/



///////////////
// GET Lists //
///////////////

test("List - GET /lists/", function () {
    login('test1', 'test1');

    // Create Lists
    var lists = Array();
    lists.push(list_create("ListOne"));
    lists.push(list_create("ListTwo"));
    lists.push(list_create("ListThree"));

    // GET /lists/
    var data;
    $.ajax({
        url : '/lists/',
        type: 'GET',
        async: false,
        success: function (result, status, xhr) {
            data = result;
        }
    });

    equal(data, {"lists": lists}, "Correct lists.");
});

/////////////////
// DELETE List //
/////////////////
