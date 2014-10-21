/**
 * Script to seed a sample database for testing purposes. See TEST.md for
 * details about usage. Throws any errors it encounters.
 * @author seropian@mit.edu
 */

var User = require('../models/user.js').User;
var async = require('async');
var mongoose = require('mongoose');

////////////////
// CONNECT DB //
////////////////
var connection_string = 'localhost:27017/shirk';

if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/shirk';
}

mongoose.connect(connection_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    addUsers();
});

var users = [
    new User({username: 'test1', password: 'test1'}),
    new User({username: 'test2', password: 'test2'}),
    new User({username: 'test3', password: 'test3'}),
    new User({username: 'test4', password: 'test4'})
];

var addUsers = function () {
    var callback = function (err) {
        if (err) throw err;
        mongoose.connection.close();
    };

    async.each(users,
        function(user, callback) {
            user.save(callback);
        },
        callback
    );
};