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

    // Create Lists
    var lists = Array();
    lists.push(list_create('ListOne').list);
    lists.push(list_create('ListTwo').list);

    // GET /tasks/
    deepEqual(tasks_get(), {tasks: []}, "No tasks after list creation.");

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

    // Vertify All Tasks
    deepEqual(tasks_get(), {tasks: tasks[0].concat(tasks[1])},
        "All tasks retrieved from both lists.");

    // // Test Filtering Params - Limit
    deepEqual(tasks_get_filter("limit=2"), {tasks: tasks[0].slice(0,2)},
        "'limit' Query - Correct number returned.");

    // // Test Filtering Params - Priority
    tasks[0].push(task_create({title: "Priority Normal", list: lists[0]._id, priority: 0}).task);
    tasks[0].push(task_create({title: "Priority High 1", list: lists[0]._id, priority: 1}).task);
    tasks[0].push(task_create({title: "Priority High 2", list: lists[0]._id, priority: 1}).task);
    tasks[0].push(task_create({title: "Priority Low 1", list: lists[0]._id, priority: -1}).task);
    tasks[0].push(task_create({title: "Priority Low 2", list: lists[0]._id, priority: -1}).task);

    deepEqual(tasks_get(), {tasks: tasks[0].slice(0,3).concat(tasks[1]).concat(tasks[0].slice(3,8))},
        "'priority' Query - Mixed priorities; all returned.");
    deepEqual(tasks_get_filter("priority=-1"), {tasks: [tasks[0][6], tasks[0][7]]},
        "'priority' Query - Low priorities.");
    deepEqual(tasks_get_filter("priority=1"), {tasks: [tasks[0][4], tasks[0][5]]},
        "'priority' Query - High priorities.");
    deepEqual(tasks_get_filter("priority=0"), {tasks: tasks[0].slice(0,3).concat(tasks[1]).concat(tasks[0].slice(3,4))},
        "'priority' Query - Normal priorities.");

    // Test Filtering Params - Completed
    var completedID = task_create({title: "Completed Task", list: lists[0]._id})._id;
    console.log(completedID);
    tasks[0].push(task_replace(completedID, {title: "Completed Task", list: lists[0]._id, completed: true}));

    deepEqual(tasks_get_filter(lists[0]._id, "completed=1"), {tasks: [tasks[0][8]]},
        "'completed' Query - Completed Tasks");

    // Test Filtering Params - Dates
    tasks[0].push(task_create({title: "Dated 1-19-1970", list: lists[0]._id, deadline: new Date(1970, 1, 19)}).task);
    tasks[0].push(task_create({title: "Dated 1-20-1970", list: lists[0]._id, deadline: new Date(1970, 1, 20)}).task);
    tasks[0].push(task_create({title: "Dated 1-20-1970", list: lists[0]._id, deadline: new Date(1970, 1, 20)}).task);
    tasks[0].push(task_create({title: "Dated 1-21-1970", list: lists[0]._id, deadline: new Date(1970, 1, 21)}).task);
    tasks[0].push(task_create({title: "Dated 1-22-1970", list: lists[0]._id, deadline: new Date(1970, 1, 22)}).task);
    tasks[0].push(task_create({title: "Dated 1-22-2008", list: lists[0]._id, deadline: new Date(2008, 1, 22)}).task);

    deepEqual(tasks_get_filter(
        "endDate=" + datestring(1, 20, 1970) + "&startDate=" + datestring(1, 20, 1970)),
         {tasks: tasks[0].slice(10,12)},
        "Date Query - Tasks on 1-20-1970.");
    deepEqual(tasks_get_filter(
        "endDate=" + datestring(1, 20, 1970)),
         {tasks: tasks[0].slice(9,12)},
        "Date Query - Tasks on and before 1-20-1970.");
    deepEqual(tasks_get_filter(
        "startDate=" + datestring(1, 21, 1970)),
         {tasks: tasks[0].slice(12,15)},
        "Date Query - Tasks on and after 1-21-1970.");
    deepEqual(tasks_get_filter(
        "startDate=" + datestring(1, 20, 1970) + "&endDate=" + datestring(1,21,1970)),
         {tasks: tasks[0].slice(10,13)},
        "Date Query - Tasks on and between 1-20-1970 and 1-21-1970.");
});

test('Task - GET /tasks/:id', function () {
    login('test1', 'test1');
    clear_user();

    // Create Two Tasks in One Lists
    var list = list_create('AList').list;
    var task1 = task_create({title: "TaskOne", list: list._id}).task;
    var task2 = task_create({title: "TaskTwo", list: list._id}).task;

    deepEqual(task_get(task1._id).task, task1,
      "Task " + task1._id.toString() + " retrieved by ID.");

    deepEqual(task_get(task2._id).task, task2,
      "Task " + task2._id.toString() + " retrieved by ID.");
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
        completed: true,
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
	// TODO: Finish by adding more edits and checks.
    login('test1', 'test1');
    clear_user();

    // Create List
    var list1 = list_create("List One").list;

    // Create Task
    // title(req), list(req), completed(default=false), priority(default=0), notes, deadline, owner(req)
    var task1 = task_create({
        title: "Task One",
        list: list1._id,
        priority: -1,
    }).task;

    // Edit Task Title
    var task1_edited = task_replace(task1._id, {title: "New Name!"}).task;

    // Verify Task
    equal(task1_edited.title, "New Name!",
        "Task "+ task1._id.toString() + " successfully renamed from \'"
        + String(task1.title) + "\' to \'" + task1_edited.title + "\'.");

    // Try to Empty List Title
    task_replace(task1._id, {title: ""});

    // Verify Task (title should not have changed to empty)
    equal(task_get(task1._id).task.title, "New Name!",
        "Task "+ task1._id.toString() + " not renamed from \'"
        + String(task1_edited.title) + "\' to the empty string.");

    // Create Another List
    var list2 = list_create("List Two").list;

    // Edit Task List
    task1_edited = task_replace(task1._id, {list: list2._id}).task;

    // Verify Task
    equal(task1_edited.list, list2._id,
        "Task "+ task1._id.toString() + " successfully moved from list \'"
        + String(task1.list) + "\' to \'" + task1_edited.list + "\'.");

    // Try to Empty List Field
    var task1_bad_edit = task_replace(task1_edited._id, {list: ""});

    // Verify Task (list should not have changed to empty)
    equal(task1_bad_edit.task.list, task1_edited.list,
        "Task "+ task1._id.toString() + " not moved from \'"
        + String(task1_edited.list) + "\' to the empty string list.");

    // Mark Task Completed
    var task2 = task_create({
        title: "Task Two",
        list: list1._id,
    }).task;
    var task2_completed = task_replace(task2._id, {completed: true}).task;
    equal(task2_completed.completed, true,
    	"Task "+ task2._id.toString() + " successfully marked completed.");
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