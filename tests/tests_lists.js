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
    deepEqual(data, {'lists': lists}, 'All Lists retrieved correctly.');
});

test('List - GET /lists/:id', function () {
    login('test1', 'test1');
    clear_user();

    // Create Lists
    var lists = Array();
    lists.push(list_create('ListOne').list);
    lists.push(list_create('ListTwo').list);

    // GET /lists/:id
    deepEqual(list_get(lists[0]._id), {list: lists[0], tasks: []},
        "Empty List " + lists[0]._id.toString() + " successfully retrieved.");
    deepEqual(list_get(lists[1]._id), {list: lists[1], tasks: []},
        "Empty List " + lists[1]._id.toString() + " successfully retrieved.");

    // Create Tasks
    var tasks = Array();
    tasks.push(Array()); // tasks[0] in lists[0]
    tasks.push(Array()); // tasks[1] in lists[1]

    tasks[0].push(task_create({title: "Task 0-1", list: lists[0]._id}).task);
    tasks[0].push(task_create({title: "Task 0-2", list: lists[0]._id}).task);
    tasks[0].push(task_create({title: "Task 0-3", list: lists[0]._id}).task);
    tasks[1].push(task_create({title: "Task 1-1", list: lists[1]._id}).task);
    tasks[1].push(task_create({title: "Task 1-2", list: lists[1]._id}).task);
    tasks[1].push(task_create({title: "Task 1-3", list: lists[1]._id}).task);
    tasks[1].push(task_create({title: "Task 1-4", list: lists[1]._id}).task);

    // Verify Tasks in Lists
    deepEqual(list_get(lists[0]._id), {list: lists[0], tasks: tasks[0]},
        "Non-empty List " + lists[0]._id.toString() + " retrieved with " + tasks[0].length.toString() +" unque Tasks.");
    deepEqual(list_get(lists[1]._id), {list: lists[1], tasks: tasks[1]},
        "Non-empty List " + lists[1]._id.toString() + " retrieved with " + tasks[1].length.toString() +" unque Tasks.");

    // Test Filtering Params - Limit
    deepEqual(list_get_filter(lists[0]._id, "limit=2"), {list: lists[0], tasks: tasks[0].slice(0,2)},
        "'limit' Query - Correct number returned.");

    // Test Filtering Params - Priority
    tasks[0].push(task_create({title: "Priority Normal", list: lists[0]._id, priority: 0}).task);
    tasks[0].push(task_create({title: "Priority High 1", list: lists[0]._id, priority: 1}).task);
    tasks[0].push(task_create({title: "Priority High 2", list: lists[0]._id, priority: 1}).task);
    tasks[0].push(task_create({title: "Priority Low 1", list: lists[0]._id, priority: -1}).task);
    tasks[0].push(task_create({title: "Priority Low 2", list: lists[0]._id, priority: -1}).task);

    deepEqual(list_get(lists[0]._id), {list: lists[0], tasks: tasks[0]},
        "'priority' Query - Mixed priorities; all returned.");
    deepEqual(list_get_filter(lists[0]._id, "priority=-1"), {list: lists[0], tasks: [tasks[0][6], tasks[0][7]]},
        "'priority' Query - Low priorities.");
    deepEqual(list_get_filter(lists[0]._id, "priority=1"), {list: lists[0], tasks: [tasks[0][4], tasks[0][5]]},
        "'priority' Query - High priorities.");
    deepEqual(list_get_filter(lists[0]._id, "priority=0"), {list: lists[0], tasks: tasks[0].slice(0,4)},
        "'priority' Query - Normal priorities.");

    // Test Filtering Params - Completed
    // task_create({title: "Completed Task", list: lists[0]._id, completed: 1});
    // tasks[0].push(task_create({title: "Completed Task", list: lists[0]._id, completed: 1}).task);

    // deepEqual(list_get_filter(lists[0]._id, "completed=1"), {list: lists[0], tasks: [tasks[0][8]]},
    //     "'completed' Query - Completed Tasks");

    // Test Filtering Params - Dates

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
        "List "+ list1._id.toString() + " not renamed from \'"
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

    // Verify Lists
    equal(list_get(list1._id), null, "List "+ list1._id.toString() + " successfully deleted.");
    deepEqual(list_get(list2._id).list, list2, "List "+ list2._id.toString() + " not deleted (unaffected).");

    // Delete Nonexitent Lists
    equal(list_delete("").status, 404, "No ID provided; correct error code.");
    equal(list_delete("617061706170617061706170").status, 404, "Task ID not found; correct error code.");

    // Verify Deletion
    equal(list_get(list1._id), null,
        'List ' + list1._id.toString() + ' successfully deleted.');
    deepEqual(list_get(list2._id).list, list2,
        'List ' + list2._id.toString() + ' not deleted (unaffected).');
});