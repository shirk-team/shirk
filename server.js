var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var mongoose = require('mongoose');
var User = require('./models/user.js').User;

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) return done(err);

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        });
    }
));

var app = express();
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: 'asdf', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

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

