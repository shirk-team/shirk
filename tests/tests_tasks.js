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
    var task1_content = {
    	title: "Task One",
    	list: list1._id
    };

    var task1 = task_create(task1_content); //.task;
    console.log(task1);

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

    // Create Two Tasks

    // Verify Tasks

    // Delete Task 1

    // Verify Deletion
});