/**
 * Automated tests for Lists.
 * @author aandre@mit.edu, seropian@mit.edu
*/



///////////////
// GET Lists //
///////////////

test("List - GET /lists/", function () {
    login('test1', 'test1');
    clear_all();
    console.log('1');

    // Create Lists
    var lists = Array();
    lists.push(list_create("ListOne").list);
    lists.push(list_create("ListTwo").list);
    lists.push(list_create("ListThree").list);
console.log('2');
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
    console.log('3');
    console.log(data.lists, lists, data.lists==lists);
    deepEqual(data, {"lists": lists}, "Correct lists.");
});

/////////////////
// DELETE List //
/////////////////
