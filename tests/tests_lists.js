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
    var data = list_get('');
    deepEqual(data, {"lists": lists}, "Correct lists retrieved.");
});

test("List - GET /lists/:id", function () {
    login('test1', 'test1');
    clear_all();

    // Create Lists
    var lists = Array();
    lists.push(list_create("ListOne").list);
    lists.push(list_create("ListTwo").list);

    // GET /lists/:id
    var data = list_get(lists[0]._id);
    deepEqual(data, {list: lists[0], tasks: []}, "Correct list retrieved.");
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

    // Verify Lists
    deepEqual(list_get(list1._id).list, list1, "List "+ list1._id.toString() + " successfully created.");
    deepEqual(list_get(list2._id).list, list2, "List "+ list2._id.toString() + " successfully created.");
    deepEqual(list_get(list3._id).list, list3, "List "+ list3._id.toString() + " successfully created.");
});

/////////////////////
// PUT (Edit) List //
/////////////////////

test("List - PUT /lists/:id", function () {
    // TODO(tdivita): Possibly add testing to make sure you can't just empty the name (do for creation as well).
    login('test1', 'test1');
    clear_all();

    // Create List
    var list1 = list_create("ListOne").list;

    // Edit List Title (the only editable attribute)
    var list1_edited = list_rename(list1._id, "New Name!");

    // Verify List
    equal(list1_edited.list.title, "New Name!", "List "+ list1._id.toString() + " successfully renamed from \'"
        + String(list1.title) + "\' to \'" + list1_edited.list.title + "\'.");

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