/**
 * Automated tests for Tasks.
 * @author aandre@mit.edu, seropian@mit.edu, tdivita@mit.edu
 */

///////////////
// GET Tasks //
///////////////

test('Task - GET /tasks/', function () {
    login('test1', 'test1');
    clear_user();

    // Create Tasks

    // GET /tasks/
});

test('Task - GET /tasks/:id', function () {
    login('test1', 'test1');
    clear_user();

    // Create Tasks

    // GET /tasks/:id
});

///////////////
// POST Task //
///////////////

test('Task - POST /tasks/', function () {
    login('test1', 'test1');
    clear_user();

    // Create a List to Hold the Tasks
    var list1 = list_create("ListOne").list;

    // Create Tasks
    // title(req), list(req), completed(default=false), priority(default=0), notes, deadline, owner(req)
    // A task with just the minimum - a title and a list.
    var task1 = task_create({
        title: "Task One",
        list: list1._id,
    }).task;
    // A task that also has a note attached.
    var task2 = task_create({
        title: "Task Two",
        list: list1._id,
        notes: "These are some notes.",
    }).task;
    // A task with a priority specifically set.
    var task3 = task_create({
        title: "Task Three",
        list: list1._id,
        priority: 1,
    }).task;
    // A task with a deadline set.
    var task4 = task_create({
        title: "Task Four",
        list: list1._id,
        deadline: new Date(2014, 10, 25, 23, 59, 59, 999),
    }).task;
    // A task with all the options set.
    var task5 = task_create({
        title: "Task Five",
        list: list1._id,
        notes: "Notes notes notes",
        priority: -1,
        deadline: new Date(2014, 10, 25, 23, 59, 59, 999),
    }).task;
    // A task without an empty title set. This should fail to be created.
    var task6 = task_create({
        title: "",
        list: list1._id,
    });
    // A task without a title set. This should fail to be created.
    var task7 = task_create({
        list: list1._id,
    });
    // A task without a list set. This should fail to be created.
    var task8 = task_create({
        title: "Task Eight",
    });

    // Verify Tasks
    deepEqual(task_get(task1._id).task, task1,
        "Task " + task1._id.toString() + " successfully created.");
    deepEqual(task_get(task2._id).task, task2,
        "Task "+ task2._id.toString() + " successfully created.");
    deepEqual(task_get(task3._id).task, task3,
        "Task "+ task3._id.toString() + " successfully created.");
    deepEqual(task_get(task4._id).task, task4,
        "Task " + task4._id.toString() + " successfully created.");
    deepEqual(task_get(task5._id).task, task5,
        "Task "+ task5._id.toString() + " successfully created.");
    // Cannot create a task with an empty title, so this should have failed.
    equal(undefined, task6,
        "Task not successfully created. Cannot have empty title.");
    // Cannot create a task with no title, so this should have failed.
    equal(undefined, task7,
        "Task not successfully created. Cannot have no title.");
    // Cannot create a task with no list, so this should have failed.
    equal(undefined, task8,
        "Task not successfully created. Cannot have no list.");
});

/////////////////////
// PUT (Edit) Task //
/////////////////////

test('Task - PUT /tasks/:id', function () {
    // TODO(tdivita): Possibly add testing to make sure you can't just empty
    // the name (do for creation as well).
    login('test1', 'test1');
    clear_user();

    // Create Task

    // Edit Task

    // Verify Task
});

/////////////////
// DELETE Task //
/////////////////

test('Task - DELETE /tasks/:id', function() {
    login ('test1', 'test1');
    clear_user();

    // Create List
    var list = list_create('TestList1').list;

    // Create Two Tasks
    var task1 = task_create({
        title: 'TestTask1',
        list: list._id,
        notes: 'This is a test task.'
    }).task;

    var task2 = task_create({
        title: 'TestTask2',
        list: list._id,
        notes: ''
    }).task;

    // Verify Tasks
    deepEqual(task_get(task1._id).task, task1, 
        'Task ' + task1._id.toString() + ' successfully created.');
    deepEqual(task_get(task2._id).task, task2, 
        'Task ' + task2._id.toString() + ' successfully created.');
    
    // Delete Task 1
    task_delete(task1._id);

    // Verify Deletion
    equal(task_get(task1._id), null, 
        'Task ' + task1._id.toString() + ' successfully deleted.');
    deepEqual(task_get(task2._id).task, task2, 
        'Task ' + task2._id.toString() + ' not deleted (unaffected).');
});