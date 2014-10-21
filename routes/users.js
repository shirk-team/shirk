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
        return res.status(200).json({userID: user._id});
    });
});

module.exports = router;