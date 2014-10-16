/**
 * Script to seed a sample database for testing purposes. See TEST.md for
 * details about usage.
 * @author seropian@mit.edu
 */

var List = require('../models/list.js').List;
var Task = require('../models/task.js').Task;
var async = require('async');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testDb');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    seedDb();
});

function seedDb() {
    var homework = new List({title: 'Homework'});
    homework.save(function(err) {
        if (err) return console.error.bind(console, 'connection error:');

        var tasks = [
            new Task({
                title: '6.170 P3.1',
                list: homework,
                priority: 0,
                completed: true,
                notes: 'Figure out a project and design it.',            
                deadline: new Date("October 14, 2014")
            }),
            new Task({
                title: '6.170 P3.2',
                list: homework,
                priority: 1,
                notes: 'Design and implement an API for the backend.',            
                deadline: new Date("October 21, 2014")
            }),
            new Task({
                title: '6.170 P3.3',
                list: homework,
                priority: -1,
                completed: false,
                notes: 'All of the frontend.',            
                deadline: new Date("October 28, 2014")
            }),
            new Task({
                title: 'Reflect on what we learned',
                list: homework
            })
        ];
       
        async.each(tasks,
            function(task, callback) {
                task.save(function(err) {
                    if (err) {
                        callback(console.error.bind(console, 'connection error:'));
                    } else {
                        callback(null);
                    }
                });
            },
            function(err) {
                if (err) {
                    console.log('The following error occured while seeding ' +
                        'the database. Please clear the database and try ' + 
                        'again.\n', err);
                }
                mongoose.connection.close();
            }
        );
    });        
}