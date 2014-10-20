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
	var newList = new List({
		title: req.list.title,
		owner: req.user._id});
	newList.save(function(err) {
        if (err) throw err;

        // TODO(tdivita): Do we want to redirect to the page of the newly created list here? That seems to make sense to me.
        res.redirect('/lists/' + String(newList._id));
    });
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
	// TODO(tdivita): Where do we want to do validation for checking that title is nonempty and so on?
	List.findByIdAndUpdate(req.params.id, { $set: {title: req.list.title}}, function (err, list) {
		if (err) throw err;

		// TODO(tdivita): Do we want to redirect to the newly edited list here?
		res.redirect('/lists/' + String(req.params.id));
	});
});


/**
 * DELETE /lists/:id
 *
 * Descrition: Deletes the specified List and its associated Tasks.
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
        if (list.owner !== req.user.id) return res.status(401).send('Unauthorized');

        Task.find({list: list._id}).remove(function(err) {
            if (err) return res.status(500).send(err);
        });

        list.remove(function(err) {
            if (err) return res.status(500).send(err);
        });
    });
});

module.exports = router;