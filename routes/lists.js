var express = require('express');
var url = require('url');
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
 *   title: String,
 *   owner: UserID // only in response
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
        if (err) res.status(500).send(err);
        res.json({lists: lists});
    });
});


/**
 * POST /lists/
 *
 * Description: Create a new List.
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
    // Create a new list with the provided title, belonging to the current user.
	var newList = new List({
		title: req.body.list.title,
		owner: req.user._id});

    // Save the newly-created list and return it.
	newList.save(function(err, list) {
        if (err) return res.status(500).json(err);
        return res.status(200).json({list: list});
    });
});

/**
 * GET /lists/:id
 *
 * Description: Retrieves the specified List and its
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
  // parse (optional) query parameters
  var args = url.parse(req.url, true).query;
  var query = {};

  if (args.priority) query['priority'] = parseInt(args.priority, 10);
  if (args.completed) query['completed'] = Boolean(args.completed);
  if (args.startDate || args.endDate) {
    query.deadline = {};
    if (args.startDate) query.deadline["$gte"] = new Date(args.startDate);
    if (args.endDate) query.deadline["$lte"] = new Date(args.endDate);
  }

  // find List
  List.findById(req.params.id, function (err, list) {
    // Validate Result
    if (err) return res.status(500).send(err);
    if (!list) return res.status(404).send(req.params.id);
    // Check List Ownership
    if (list.owner.toString() !== req.user._id.toString())
        return res.status(401).send('Unauthorized');

    query['list'] = list._id;

    // find corresponding Tasks
    var taskQuery = Task.find(query);
    if (args.limit) taskQuery.limit(parseInt(args.limit, 10));
    taskQuery.exec(function (err, tasks) {
      if (err) return res.status(500).send(err);
      // Return List and its Tasks
      return res.json({list: list, tasks: tasks});
    });
  });
});


/**
 * PUT /lists/:id
 *
 * Description: Modifies the specified List.
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
    // Find the specified list to edit.
    List.findById(req.params.id, function (err, list) {
        if (err) return res.status(500).send(err);

        // Update the list title (with schema validation).
        list.title = req.body.list.title;

        // Save the newly-created list and return it.
        list.save(function(err) {
            if (err) return res.status(500).send(err);
            return res.status(200).json({list: list});
        });
    });
});


/**
 * DELETE /lists/:id
 *
 * Description: Deletes the specified List and its associated Tasks.
 *
 * Path Params:
 *   id - ListID identifier string
 *
 * Response: {
 *   listID: listID
 * }
 *
 * Author: seropian@mit.edu
 */
// TODO: test
router.delete('/:id', function (req, res) {
    List.findById(req.params.id, function(err, list) {
        if (err) return res.status(500).send(err);
        if (!list) return res.status(404).send(req.params.id);
        if (list.owner.toString() !== req.user._id.toString())
            return res.status(401).send('Unauthorized');

        Task.find({list: list._id}).remove(function(err) {
            if (err) return res.status(500).send(err);
        });

        list.remove(function(err) {
            if (err) return res.status(500).send(err);
            return res.status(200).json({listID: req.params.id});
        });
    });
});

module.exports = router;