/**
 * Passport.js setup
 * @author seropian@mit.edu
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user.js').User;

/**
 * Authenticating the user requires checking to see if the provided username,
 * password pair exist in the database. If authentication fails, passes on
 * user as false with an object with a 'message' property that is either
 * 'Incorrect username' or 'Incorrect password' based on why the login failed.
 * If authentication succeeds, passes on the authenticated user.
 */
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({username: username}, function(err, user) {
            if (err) return done(err);

            if (!user) {
                return done(null, false, {message: 'Incorrect username'});
            }

            if (user.password !== password) {
                return done(null, false, {message: 'Incorrect password'});
            }

            return done(null, user);
        });
    }
));

/**
 * Users are serialized by their id.
 */
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

/**
 * Users are unserialized by looking up a user with the given id in the
 * database.
 */
passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport;