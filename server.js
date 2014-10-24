/**
 * Shirk server.
 * @author seropian@mit.edu, aandre@mit.edu
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: 'shirk', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/////////////
// Schemas //
/////////////
var List = require('./models/list').List;
var Task = require('./models/task').Task;
var User = require('./models/user').User;

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

db.once('open', function callback () {
    app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080,
        process.env.OPENSHIFT_NODEJS_IP);
});

//////////
// HOME //
//////////

app.get('/', function (req, res) {
  if (req.user == undefined || req.user == null) {
    res.render('login'); // unathenticated
  } else {
    res.render('main');  // authenticated
  }
});

//////////
// AUTH //
//////////

/**
 * Try to log the user in.
 * Expects the request's body to contain username and password fields. If the
 * username and password provided match a user in the database, sends back
 * an empty object. Otherwise, sends a 401 error code and the response text
 * 'Incorrect username.' or 'Incorrect password.' based on why the login failed.
 */
app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) return next(err);

        if (!user) return res.status(401).send(info.message);

        req.login(user, function(err) {
            if (err) return next(err);
            return res.status(200).redirect('/');
        });
    })(req, res, next);
});

/**
 * Logout via passport and redirect to home page (login/signup page).
 */
app.post('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

// Verify Authentication (each request pertaining to lists and tasks)
var verifyUser = function (req, res, next) {
    if (req.user == undefined || req.user == null) {
        return res.status(403).json({
            error: 'Only authenticated users may perform this request.'
        });
    }
    next();
};

app.all('/lists', verifyUser);
app.all('/tasks', verifyUser);

////////////
// ROUTES //
////////////
app.use('/tasks', require('./routes/tasks'));
app.use('/lists', require('./routes/lists'));
app.use('/users', require('./routes/users'));

///////////
// DEBUG //
///////////

// Clears all data for the current user. Used for testing.
app.post('/clear', function(req, res){
    List.remove({owner: req.user._id}, function(err) {
        if(err) return res.status(500);
        Task.remove({owner: req.user._id}, function(err) {
            if(err) return res.status(500);
            return res.status(200).json({});
        });
    });
});

// Clears all data. Used for testing.
app.post('/clearAll', function(req, res){
    List.remove({}, function(err) {
        if(err) return res.status(500);
        Task.remove({}, function(err) {
            if(err) return res.status(500);
            User.remove({}, function(err) {
                if(err) return res.status(500);
                return res.status(200).json({});
            });
        });
    });
});
