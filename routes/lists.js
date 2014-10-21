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
 *	 owner: UserID // only in response
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
	var newList = new List({
		title: req.body.list.title,
		owner: req.user._id});
	newList.save(function(err, list) {
        if (err) return res.status(500).send(err);
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
  // var query = url.parse(request.url, true).query;
  // console.log (query);
  res.send({});
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
	List.findByIdAndUpdate(req.params.id, { $set: {title: req.body.list.title}}, function (err, list) {
        if (err) return res.status(500).send(err);
        return res.status(200).json({list: list});
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