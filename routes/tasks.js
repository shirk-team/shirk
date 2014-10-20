var express = require('express');
var router = express.Router();

// Models
var List = require('../models/list'),
  Task = require('../models/task'),
  User = require('../models/user');

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
 *	 owner: UserID // only in response
 * }
 */

/**
 * GET /tasks/
 *
 * Descrition: Retrieves all tasks, optionally filted by query parameters.
 *
 * Query Args:
 *   limit - max number of lasts to return (default: Infinite)
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
 * Descrition: Create a new Task.
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
		// TODO(tdivita): Where do we want to do validation for checking that this is nonempty and so on?
		title: req.task.title,
		notes: req.task.notes,
		// TODO(tdivita): Where do we want to do validation for checking that this is nonempty and so on?
		list: req.task.list,
		owner: req.user._id
	});
	// Only set deadline and priority if they were provided, otherwise let them be decided by schema defaults.
	if (req.task.deadline) {
		newTask.deadline = req.task.deadline;
	}
	if (req.task.priority) {
		newTask.priority = req.task.priority;
	}
	newTask.save(function(err) {
        if (err) throw err;

        // TODO(tdivita): Do we want to redirect to the page of the newly created task here?
        res.redirect('/tasks/' + String(newTask._id));
    });
});

/**
 * GET /tasks/:id
 *
 * Descrition: Retrieves the specified task.
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

});

/**
 * PUT /tasks/:id
 *
 * Descrition: Modifies the specified Task.
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
		if (err) throw err;

		// If values were set in the request, edit them in the database.
		editTaskValuesIfProvided(task, req.task);
		task.save(function(err) {
	        if (err) throw err;

	        // TODO(tdivita): Do we want to redirect to the page of the newly edited task here? Alternatively, we could go to its list's page.
	        res.redirect('/tasks/' + String(req.params.id));
	    });
	});
});

/**
* Helper function for editing tasks. Checks whether fields were provided in the request,
* and sets them in the database document for the task if they were.
*
* Author: tdivita@mit.edu
**/
function editTaskValuesIfProvided(taskToEdit, taskRequest) {
	/**
	TODO(tdivita): Is there a better way to do this, where I could iterate over a list of properties somehow? I can think of ways that might
	work, but they are reliant on the fact that the properties have the same names, which is eh. It also wouldn't get all the much shorter.
	**/
	if(taskRequest.title) taskToEdit.title = taskRequest.title;
	if(taskRequest.notes) taskToEdit.notes = taskRequest.notes;
	if(taskRequest.list) taskToEdit.list = taskRequest.list;
	if(taskRequest.deadline) taskToEdit.deadline = taskRequest.deadline;
	if(taskRequest.priority) taskToEdit.priority = taskRequest.priority;
	if(taskRequest.completed) taskToEdit.completed = taskRequest.completed;
}

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
        if (task.owner !== req.user.id) return res.status(401).send('Unauthorized');

        task.remove(function(err) {
            if (err) return res.status(500).send(err);
        });
    });
});

module.exports = router;