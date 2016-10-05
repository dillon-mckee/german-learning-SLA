var express = require('express');
var app = express();
var routes = require('./routes')
var passport = require('passport');
var googleStrategy = require('passport-google-oauth20').Strategy;
var bearerStrategy = require('passport-http-bearer').Strategy;
var bodyParser = require('body-parser');
var words = require('./models/words');
var mongoose = require('mongoose');
var config = require('./config');
//res.cookie('accessToken', req.user.accessToken, {expires:0, httpOnly: true });

passport.use(new googleStrategy({
    clientID: '525886096245-th0hhdgnfprvn1pp2pruv4bcr1ds2j73.apps.googleusercontent.com',
    clientSecret: 'qGo2alB2CSMDdExUvIIyKxY7',
    callbackURL: 'http://localhost:3000/login/google/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));

//   passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });
//
// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });
app.use(bodyParser.json());
app.use('/', express.static('build'));
// app.use(passport.initialize());
// app.use(passport.session());

app.get('/login/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/login/google/return',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function(req, res) {
    res.redirect('/');
});

passport.use(new bearerStrategy(
    function (token, done) {
        console.log('token', token);
        //TODO: find user with token then run callback with user
        // if (token == 'Ci9zA8DD8I8WGVOuSTGWxT6j5liMz9buxSOFh9nHvam2docwk') {
        if (token == '12345') {
            var user = {user: 'bob'};
            return done(null, user, {scope: 'read'});
        } else {
            return done(null, false);
        }
    }
));

app.get('/questions',
  passport.authenticate('bearer', { failureRedirect: '/login', session: false }),
  function(req, res) {
    res.json(req.user);
});

app.use('/', routes)



var runServer = function(callback) {
  mongoose.connect(config.DATABASE_URL, function(err) {
    if (err && callback) {
      return callback(err);
    }

    app.listen(config.PORT, function() {
      console.log('Listening on localhost:' + config.PORT);
      if (callback) {
          callback();
      }
    });
  });
};

if (require.main === module) {
  runServer(function(err) {
    if (err) {
        console.error(err);
    }
  });
};



exports.app = app;
exports.runServer = runServer;
