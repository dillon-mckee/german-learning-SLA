var express = require('express');
var app = express();
var routes = require('./routes')
var passport = require('passport');
var googleStrategy = require('passport-google-oauth20').Strategy;
var bearerStrategy = require('passport-http-bearer').Strategy;
var bodyParser = require('body-parser');
var words = require('./models/words').words
var mongoose = require('mongoose');
var config = require('./config');
//res.cookie('accessToken', req.user.accessToken, {expires:0, httpOnly: true });

passport.use(new googleStrategy({
    clientID: '525886096245-th0hhdgnfprvn1pp2pruv4bcr1ds2j73.apps.googleusercontent.com',
    clientSecret: 'qGo2alB2CSMDdExUvIIyKxY7',
    callbackURL: 'http://localhost:3000/login/google/return'
  },
  function(accessToken, refreshToken, profile, cb) {
//console.log(profile);
    var user = {
      profile: profile.id,
      accessToken: accessToken,
      displayName: profile.displayName
    }
    return cb(null, user); //==>> req.user
  }));


app.use(bodyParser.json());
app.use('/', express.static('build'));
// app.use(passport.initialize());
// app.use(passport.session());

app.get('/login/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/login/google/return',
  passport.authenticate('google', { scope: ['profile'], failureRedirect: '/login/google', session: false }),
  function(req, res) {
    //console.log("return log", res);
    res.cookie('accessToken', req.user.accessToken, {expires: 0})
    res.redirect('/');
});

passport.use(new bearerStrategy(
    function (token, done) {
        console.log('token', token);
        //TODO: find user with token then run callback with user
        // if (token == 'Ci9zA8DD8I8WGVOuSTGWxT6j5liMz9buxSOFh9nHvam2docwk') {
        if (token == 'ya29.Ci90A-2oLWLKwrg-TxU4-v6lOglU1OaG2yhSk9cYQmZK3A_Ey-Diq9uNGD_YaV2ggg') {
            var user = {user: 'bob'};
            return done(null, user, {scope: 'read'});
        } else {
            return done(null, false);
        }
    }
));

// console.log("Log from line58", words);

var questionIndex = 0;
var userScore = 0;

app.get('/api/words',
  passport.authenticate('bearer', {session: false }),
  function(req, res) {
    res.json({words: words[questionIndex],
              userScore: userScore});
    console.log(words[questionIndex]);
});

app.post('/api/words',
  passport.authenticate('bearer', {session: false }),
  function(req, res) {
    console.log(req.body);
    var isAnswerCorrect;
    var userAnswer = req.body.userAnswer;
    console.log('word to compare', words[questionIndex].english)
    if (userAnswer === words[questionIndex].english) {
      userScore = userScore += 10;
      isAnswerCorrect = 'true';
    }
    console.log(userScore);
    res.json({words: words[questionIndex],
              userScore: userScore,
              isAnswerCorrect: isAnswerCorrect});
    console.log(words[questionIndex]);
    questionIndex++;
});
app.get('/logout', function (req, res) {
    console.log('req.user before', req.user)
    req.logout();
    console.log('req.user after', req.user)
    res.redirect('/');
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
