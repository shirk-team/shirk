/**
 * Automated tests for Lists.
 * @author aandre@mit.edu, seropian@mit.edu, tdivita@mit.edu
*/



///////////////
// GET Lists //
///////////////

test("List - GET /lists/", function () {
    login('test1', 'test1');
    clear_all();

    // Create Lists
    var lists = Array();
    lists.push(list_create("ListOne").list);
    lists.push(list_create("ListTwo").list);
    lists.push(list_create("ListThree").list);

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
    deepEqual(data, {"lists": lists}, "Correct lists.");
});

///////////////
// POST List //
///////////////

test("List - POST /lists/", function () {
    login('test1', 'test1');
    clear_all();

    // Create Lists
    var list1 = list_create("ListOne").list;
    var list2 = list_create("ListTwo").list;
    var list3 = list_create("ListThree").list;

    // Verify List
    deepEqual(list_get(list1._id).list, list1, "List "+ list1._id.toString() + " successfully created.");
    deepEqual(list_get(list2._id).list, list2, "List "+ list2._id.toString() + " successfully created.");
    deepEqual(list_get(list3._id).list, list3, "List "+ list3._id.toString() + " successfully created.");
});

/////////////////
// DELETE List //
/////////////////

test("List - DELETE /lists/:id", function() {
    login ('test1', 'test1');
    clear_all();

    // Create Two List
    var list1 = list_create("TestList1").list;
    var list2 = list_create("TestList2").list;

    // Verify List
    deepEqual(list_get(list1._id).list, list1, "List "+ list1._id.toString() + " successfully created.");
    deepEqual(list_get(list2._id).list, list2, "List "+ list2._id.toString() + " successfully created.");

    // Delete List 1
    list_delete(list1._id);

    equal(list_get(list1._id), null, "List "+ list1._id.toString() + " successfully deleted.");
    deepEqual(list_get(list2._id).list, list2, "List "+ list2._id.toString() + " not deleted (unaffected).");

});