/**
 * Automated tests for Tasks.
 * @author aandre@mit.edu, seropian@mit.edu, tdivita@mit.edu
 */

///////////////
// GET Tasks //
///////////////

test('Task - GET /tasks/', function () {
    login('test1', 'test1');
    clear_all();

    // Create Tasks

    // GET /tasks/
});

test('Task - GET /tasks/:id', function () {
    login('test1', 'test1');
    clear_all();

    // Create Tasks

    // GET /tasks/:id
});

///////////////
// POST Task //
///////////////

test('Task - POST /tasks/', function () {
	// TODO: Finish
    login('test1', 'test1');
    clear_all();

    // Create a List to Hold the Tasks
    var list1 = list_create("ListOne").list;

    // Create Tasks
    // title(req), list(req), completed(default=false), priority(default=0), notes, deadline, owner(req)
    var task1 = task_create({
        title: 'Task One',
        list: list1._id,
    }).task;

    // Verify Tasks
    deepEqual(task_get(task1._id).task, task1,
        "Task "+ task1._id.toString() + " successfully created.");
    // deepEqual(task_get(task2._id).task, task2,
    //     "Task "+ task2._id.toString() + " successfully created.");
    // deepEqual(task_get(task3._id).task, task3,
    //     "Task "+ task3._id.toString() + " successfully created.");
    // // Cannot create a list with an empty title, so this should have failed.
    // equal(undefined, task4,
    //     "Task not successfully created. Cannot have empty title.");
});

/////////////////////
// PUT (Edit) Task //
/////////////////////

test('Task - PUT /tasks/:id', function () {
    // TODO(tdivita): Possibly add testing to make sure you can't just empty
    // the name (do for creation as well).
    login('test1', 'test1');
    clear_all();

    // Create Task

    // Edit Task

    // Verify Task
});

/////////////////
// DELETE Task //
/////////////////

test('Task - DELETE /tasks/:id', function() {
    login ('test1', 'test1');
    clear_all();

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