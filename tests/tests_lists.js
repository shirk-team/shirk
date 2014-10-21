/**
 * Automated tests for Lists.
 * @author aandre@mit.edu, seropian@mit.edu, tdivita@mit.edu
*/



///////////////
// GET Lists //
///////////////

test('List - GET /lists/', function () {
    login('test1', 'test1');
    clear_user();

    // Create Lists
    var lists = Array();
    lists.push(list_create('ListOne').list);
    lists.push(list_create('ListTwo').list);
    lists.push(list_create('ListThree').list);

    // GET /lists/
    var data = lists_get();
    deepEqual(data, {'lists': lists}, 'Correct lists retrieved.');
});

test('List - GET /lists/:id', function () {
    login('test1', 'test1');
    clear_user();

    // Create Lists
    var lists = Array();
    lists.push(list_create('ListOne').list);
    lists.push(list_create('ListTwo').list);

    // GET /lists/:id
    var data = list_get(lists[0]._id);
    deepEqual(data, {list: lists[0], tasks: []}, 'Correct list retrieved.');
});

///////////////
// POST List //
///////////////

test("List - POST /lists/", function () {
    login('test1', 'test1');
    clear_user();

    // Create Lists
    var list1 = list_create("ListOne").list;
    var list2 = list_create("ListTwo").list;
    var list3 = list_create("ListThree").list;
    var list4 = list_create("");

    // Verify Lists
    deepEqual(list_get(list1._id).list, list1,
        "List " + list1._id.toString() + " successfully created.");
    deepEqual(list_get(list2._id).list, list2,
        "List " + list2._id.toString() + " successfully created.");
    deepEqual(list_get(list3._id).list, list3,
        "List " + list3._id.toString() + " successfully created.");
    // Cannot create a list with an empty title, so this should have failed.
    equal(undefined, list4,
        "List not successfully created. Cannot have empty title.");
});

/////////////////////
// PUT (Edit) List //
/////////////////////

test("List - PUT /lists/:id", function () {
    login('test1', 'test1');
    clear_user();

    // Create List
    var list1 = list_create("ListOne").list;

    // Edit List Title (the only editable attribute)
    var list1_edited = list_rename(list1._id, "New Name!").list;

    // Verify List
    equal(list1_edited.title, "New Name!",
        "List "+ list1._id.toString() + " successfully renamed from \'"
        + String(list1.title) + "\' to \'" + list1_edited.title + "\'.");

    // Try to Empty List Title
    list_rename(list1._id, "");

    // Verify List (title should not have changed to empty)
    equal(list_get(list1._id).list.title, "New Name!",
        "List "+ list1._id.toString() + " not successfully renamed from \'"
        + String(list1_edited.title) + "\' to the empty string.");

});

/////////////////
// DELETE List //
/////////////////

test('List - DELETE /lists/:id', function() {
    login ('test1', 'test1');
    clear_user();

    // Create Two Lists
    var list1 = list_create('TestList1').list;
    var list2 = list_create('TestList2').list;

    // Verify Lists
    deepEqual(list_get(list1._id).list, list1, 
        'List ' + list1._id.toString() + ' successfully created.');
    deepEqual(list_get(list2._id).list, list2, 
        'List ' + list2._id.toString() + ' successfully created.');

    // Delete List 1
    list_delete(list1._id);

    // Verify Deletion
    equal(list_get(list1._id), null, 
        'List ' + list1._id.toString() + ' successfully deleted.');
    deepEqual(list_get(list2._id).list, list2, 
        'List ' + list2._id.toString() + ' not deleted (unaffected).');
});