/**
 * Script to clear the test database.
 * @author seropian@mit.edu
 */

var List = require('../models/list.js').List;
var Task = require('../models/task.js').Task;
var User = require('../models/user.js').User;

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shirk');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    List.remove({}, function(err) {
        Task.remove({}, function(err) {
            User.remove({}, function(err) {
                mongoose.connection.close();
            });
        });
    });
});