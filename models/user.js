/**
 * Data Model for Users. Users have usernames and passwords.
 * @author seropian@mit.edu
 */

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

var User = mongoose.model('User', userSchema);

module.exports.User = User;