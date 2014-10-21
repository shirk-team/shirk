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
    login('test1', 'test1');
    clear_all();

    // Create Tasks

    // Verify Tasks
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