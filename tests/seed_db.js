/**
 * Script to seed a sample database for testing purposes. See TEST.md for
 * details about usage. Throws any errors it encounters.
 * @author seropian@mit.edu
 */

var User = require('../models/user.js').User;
var List = require('../models/list.js').List;
var Task = require('../models/task.js').Task;
var async = require('async');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shirk');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    seedDb();
});

function seedDb() {
    addUsers(function(err) {
        if (err) throw err;

        addHomework(function(err) {
            if (err) throw err;

            addHousework(function(err) {
                if (err) throw err;
                mongoose.connection.close();
            });
        });
    });
}

var users = [
        new User({username: 'admin', password: 'admin'}),
        new User({username: 'andre', password: 'andre'}),
        new User({username: 'lily', password: 'lily'}),
        new User({username: 'tricia', password: 'tricia'}),
    ];

function addUsers(callback) {
    saveThings(users, callback);
}

function addHomework(callback) {
    var homework = new List({
        title: 'Homework',
        owner: users[0] // user 'admin'
    });
    homework.save(function(err) {
        if (err) throw err;

        var tasks = [
            new Task({
                title: '6.170 P3.1',
                list: homework,
                priority: 0,
                completed: true,
                notes: 'Figure out a project and design it.',
                deadline: new Date("October 14, 2014"),
                owner: users[0] // user 'admin'
            }),
            new Task({
                title: '6.170 P3.2',
                list: homework,
                priority: 1,
                notes: 'Design and implement an API for the backend.',
                deadline: new Date("October 21, 2014"),
                owner: users[0] // user 'admin'
            }),
            new Task({
                title: '6.170 P3.3',
                list: homework,
                priority: -1,
                completed: false,
                notes: 'All of the frontend.',
                deadline: new Date("October 28, 2014"),
                owner: users[0] // user 'admin'
            }),
            new Task({
                title: 'Reflect on what we learned',
                list: homework,
                owner: users[0] // user 'admin'
            })
        ];

        saveThings(tasks, callback);
    });
}

function addHousework(callback) {
    var housework = new List({
        title: 'Housework',
        owner: users[0] // user 'admin'
    });
    housework.save(function(err) {
        if (err) throw err;

        var tasks = [
            new Task({
                title: 'Clean room!',
                list: housework,
                priority: 1,
                notes: 'Open the windows to air it out xP',
                deadline: new Date("September 1, 2014"),
                owner: users[0] // user 'admin'
            }),
            new Task({
                title: 'Do laundry',
                list: housework,
                completed: false,
                notes: '+ ironing',
                deadline: new Date("August 3, 2012"),
                owner: users[0] // user 'admin'
            }),
            new Task({
                title: 'Wash the dishes',
                list: housework,
                completed: false,
                notes: 'before roomate\'s parents come visit!!!',
                priority: 1,
                owner: users[0] // user 'admin'
            }),
            new Task({
                title: 'Organize sock drawer',
                list: housework,
                completed: true,
                priority: -1,
                deadline: new Date("August 18, 2015"),
                owner: users[0] // user 'admin'
            })
        ];

        saveThings(tasks, callback);
    });
}

var saveThings = function(things, callback) {
    async.each(things,
        function(thing, callback) {
            thing.save(callback);
        },
        callback
    );
}