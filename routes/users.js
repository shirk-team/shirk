var express = require('express');
var router = express.Router();

var User = require('../models/user').User;

/**
 * POST /users/
 *
 * Description: Create a new user.
 *
 * Request: {
 *     username: String
 *     password: String
 * }
 *
 * Response {
 *     userID: id of the created User
 * }
 *
 * Redirect: POST /login with new credentials
 * 
 * Failure: 400 for duplicate username or blank username or password
 * Author: seropian@mit.edu
 */
router.post('/', function (req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });
    
    user.save(function(err) {
        if (err) return res.status(400).send(err);
        return res.status(200).render('main');
    });
});

/**
 * DELETE /users/
 *
 * Description: Delete test user (used only for the sake of testing)
 *
 * Author: seropian@mit.edu
 */
router.delete('/', function (req, res) {
    User.findOne({username: 'test2'}, function(err, user) {
        if (err) return res.status(500).send(error);

        if (user) {
            user.remove(function(err) {
                if (err) return res.status(500).send(error);
                res.status(200).send();
            });
        } else {
            res.status(200).send();
        }
    });
});

module.exports = router;