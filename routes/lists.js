var express = require('express');
var router = express.Router();

// Models
var List = require('../models/list').List,
  Task = require('../models/task').Task,
  User = require('../models/user').User;

/**
 * List Object Specification
 *
 * List: {
 *   _id: ListID, // only in response
 *   title: String
 * }
 */

/**
 * GET /lists/
 *
 * Description: Retrieve all lists.
 *
 * Response: {
 *   list: List[]
 * }
 *
 * Author: aandre@mit.edu
 */
router.get('/', function (req, res) {
  List.find({owner: req.user._id}, function (err, lists) {
    res.send(lists);
  });
});


/**
 * POST /lists/
 *
 * Descrition: Create a new List.
 *
 * Request: {
 *   list: List
 * }
 *
 * Response: {
 *   list: List // returns created List
 * }
 *
 * Author: tdivita@mit.edu
 */
router.post('/', function (req, res) {

});

/**
 * GET /lists/:id
 *
 * Descrition: Retrieves the specified List and its
 *   associated Tasks.
 *
 * Path Params:
 *   id - ListID identifier string
 *
 * Query Args:
 *   limit - max number of lasts to return (default: Infinite)
 *   startDate - deadlines after Date (default: Any)
 *   endDate - deadlines before Date (default: Any)
 *   completed - completion status (options: 0 or 1, default: Any)
 *   priority - task priority (options: -1 or 0 or 1, default: Any)
 *
 * Response: {
 *   list: List,
 *   tasks: Task[]
 * }
 *
 * Author: aandre@mit.edu
 */
router.get('/:id', function (req, res) {

});


/**
 * PUT /lists/:id
 *
 * Descrition: Modifies the specified List.
 *
 * Path Params:
 *   id - ListID identifier string
 *
 * Request: {
 *   list: List
 * }
 *
 * Response: {
 *   list: List // after editing
 * }
 *
 * Author: tdivita@mit.edu
 */
router.put('/:id', function (req, res) {

});


/**
 * DELETE /lists/:id
 *
 * Descrition: Deletes the specified List and its assoicated Tasks.
 *
 * Path Params:
 *   id - ListID identifier string
 *
 * Response: {
 *   list: List // removed List
 * }
 *
 * Author: seropian@mit.edu
 */
router.delete('/:id', function (req, res) {

});

module.exports = router;