var express = require('express');
var router = express.Router();
var url = require('url');
var ObjectId = require('mongoose').Schema.ObjectId;

// Models
var List = require('../models/list').List;
var Task = require('../models/task').Task;
var User = require('../models/user').User;

/**
 * Task Object Specification
 *
 * Task: {
 *   _id: TaskID, // only in response
 *   title: String,
 *   notes: String,
 *   list: ListID, // reference
 *   deadline: Date, (default: None)
 *   priority: Number, (options: -1/0/1, default: 0)
 *   completed: Boolean (default: false),
 *   owner: UserID // only in response
 * }
 */

/**
 * GET /tasks/
 *
 * Description: Retrieves all tasks, optionally filted by query parameters.
 *
 * Query Args:
 *   limit - max number of tasks to return (default: Infinite)
 *   startDate - deadlines after Date (default: Any)
 *   endDate - deadlines before Date (default: Any)
 *   completed - completion status (options: 0 or 1, default: Any)
 *   priority - task priority (options: -1 or 0 or 1, default: Any)
 *
 * Response: {
 *   tasks: Task[]
 * }
 *
 * Author: aandre@mit.edu
 */
router.get('/', function (req, res) {
    // parse (optional) query parameters
    var args = url.parse(req.url, true).query;
    var query = {"owner": req.user._id};

    if (args.priority) query['priority'] = parseInt(args.priority, 10);
    if (args.completed) query['completed'] = Boolean(args.completed === "1");
    if (args.startDate || args.endDate) {
        query.deadline = {};
        if (args.startDate) query.deadline["$gte"] = new Date(args.startDate);
        if (args.endDate) query.deadline["$lte"] = new Date(args.endDate);
    }

    // find Tasks
    var taskQuery = Task.find(query);
    if (args.limit) taskQuery.limit(parseInt(args.limit, 10));
    taskQuery.exec(function (err, tasks) {
        if (err) return res.status(500).send(err);

        // Return List and its Tasks
        return res.json({tasks: tasks});
    });
});

/**
 * POST /tasks/
 *
 * Description: Create a new Task.
 *
 * Request: {
 *   task: Task
 * }
 *
 * Response: {
 *   task: Task // created Task
 * }
 *
 * Author: tdivita@mit.edu
 */
router.post('/', function (req, res) {
    // Create a new task with the provided title, notes, and list, belonging to the current user.
	var newTask = new Task({
		title: req.body.task.title,
		notes: req.body.task.notes,
		list: req.body.task.list,
		owner: req.user._id
	});

	// Only set deadline, priority, and completed if they were provided, otherwise let them
    // be decided by schema defaults.
	if (req.body.task.deadline) newTask.deadline = req.body.task.deadline;
	if (req.body.task.priority !== undefined) newTask.priority = req.body.task.priority;
	if (req.body.task.completed !== undefined) newTask.completed = req.body.task.completed;

	// Save the newly-created task and return it.
	newTask.save(function(err) {
    if (err) return res.status(500).json(err);
    return res.status(200).json({task: newTask});
  });
});

/**
 * GET /tasks/:id
 *
 * Description: Retrieves the specified task.
 *
 * Path Params:
 *   id - TaskID identifier string
 *
 * Response: {
 *   task: Task
 * }
 *
 * Author: aandre@mit.edu
 */
router.get('/:id', function (req, res) {
  Task.findById(req.params.id, function (err, task) {
    // Validate Result
    if (err) return res.status(500).send(err);
    if (!task) return res.status(404).send(req.params.id);

    // Check Tasl Ownership
    if (task.owner.toString() !== req.user._id.toString())
      return res.status(401).send('Unauthorized');

    return res.json({task: task});
  });
});

/**
 * PUT /tasks/:id
 *
 * Description: Modifies the specified Task.
 *
 * Path Params:
 *   id - TaskID identifier string
 *
 * Request: {
 *   task: Task
 * }
 *
 * Response: {
 *   task: Task // after editing
 * }
 *
 * Author: tdivita@mit.edu
 */
router.put('/:id', function (req, res) {
    // Find the specified task to edit.
	Task.findById(req.params.id, function (err, task) {
		if (err) return res.status(500).send(err);

		// If values were set in the request, edit them in the database.
		if (req.body.task.title) task.title = req.body.task.title;
		if (req.body.task.notes !== undefined) task.notes = req.body.task.notes;
		if (req.body.task.list) task.list = req.body.task.list;
		if (req.body.task.deadline) task.deadline = req.body.task.deadline;
		if (req.body.task.priority !== undefined) task.priority = req.body.task.priority;
		if (req.body.task.completed !== undefined) task.completed = req.body.task.completed;

		// Save the newly-edited task and return it.
		task.save(function(err) {
      if (err) return res.status(500).send(err);
      return res.status(200).json({task: task});
    });
	});
});

/**
 * DELETE /tasks/:id
 *
 * Description: Deletes the specified Task.
 *
 * Path Params:
 *   id - TaskID identifier string
 *
 * Response: {
 *   taskID: taskID
 * }
 *
 * Author: seropian@mit.edu
 */
router.delete('/:id', function (req, res) {
  Task.findById(req.params.id, function(err, task) {
    if (err) return res.status(500).send(err);
    if (!task) return res.status(404).send(req.params.id);

    if (task.owner.toString() !== req.user.id.toString())
      return res.status(401).send('Unauthorized');

    task.remove(function(err) {
      if (err) return res.status(500).send(err);
      res.status(200).json({taskID: req.params.id});
    });
  });
});

module.exports = router;