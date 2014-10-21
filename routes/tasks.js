var express = require('express');
var router = express.Router();
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
	var newTask = new Task({
		title: req.body.task.title,
		notes: req.body.task.notes,
		list: req.body.task.list,
		owner: req.user._id
	});

	// Only set deadline and priority if they were provided, otherwise let them
    // be decided by schema defaults.
	if (req.body.task.deadline) newTask.deadline = req.body.task.deadline;
	if (req.body.task.priority) newTask.priority = req.body.task.priority;
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
	Task.findById(req.params.id, function (err, task) {
		if (err) return res.status(500).send(err);

		// If values were set in the request, edit them in the database.
		if(req.body.task.title) task.title = req.body.task.title;
		if(req.body.task.notes) task.notes = req.body.task.notes;
		if(req.body.task.list) task.list = req.body.task.list;
		if(req.body.task.deadline) task.deadline = req.body.task.deadline;
		if(req.body.task.priority) task.priority = req.body.task.priority;
		if(req.body.task.completed) task.completed = req.body.task.completed;
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
// TODO: test
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