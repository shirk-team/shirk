/**
 * Shirk server.
 * @author seropian@mit.edu
 */

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('./authentication.js');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'tests')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'shirk', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Try to log the user in.
 * Expects the request's body to contain username and password fields. If the
 * username and password provided match a user in the database, sends back
 * an empty object. Otherwise, sends back an object with an 'error' property
 * that contains a string with either 'Incorrect username.' or
 * 'Incorrect password.' based on why the login failed.
 */
app.get('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) return next(err);

        if (!user) return res.json({error: info.message});

        req.login(user, function(err) {
            if (err) return next(err);
            return res.json({});
        });
    })(req, res, next);
});

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });

// Verify Authentication (each request)
app.use(function (req, res, next) {
    if (req.user == undefined || req.user == null) {
        return res.status(403).json({error: "Only authenticated users may perform this reuqest."});
    }
    next();
});

if (process.env.OPENSHIFT_NODEJS_PORT) {
    // TODO: set up openshift DB and connect
} else {
    mongoose.connect('mongodb://localhost/testDb');
}

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
    app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080,
        process.env.OPENSHIFT_NODEJS_IP);
});

////////////
// ROUTES //
////////////
app.use('/tasks', require('./routes/tasks'));
app.use('/lists', require('./routes/lists'));