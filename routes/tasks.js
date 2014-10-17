var express = require('express');
var router = express.Router();

// Models
var List = require('./models/list'),
  Task = require('./models/task'),
  User = require('./models/user');

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
 *   completed: Boolean (default: false)
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
router.put('/', function (req, res) {

});

/**
 * DELETE /tasks/:id
 *
 * Descrition: Deletes the specified Task.
 *
 * Path Params:
 *   id - TaskID identifier string
 *
 * Response: {
 *   task: Task // removed Task
 * }
 *
 * Author: seropian@mit.edu
 */
router.delete('/', function (req, res) {

});