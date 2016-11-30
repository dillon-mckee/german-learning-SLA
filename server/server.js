var express = require('express');
var app = express();
var routes = require('./routes')
var passport = require('passport');
var googleStrategy = require('passport-google-oauth20').Strategy;
var bearerStrategy = require('passport-http-bearer').Strategy;
var bodyParser = require('body-parser');
//var algorithm = require('./models/algorithm');
var mongoose = require('mongoose');
var config = require('./config');
var User = require('./models/users');
var words = require('./models/words').words;

app.use(bodyParser.json());
app.use('/', express.static('build'));
passport.use(new bearerStrategy(
    function (token, done) {
      User.findOne({accessToken: token},
        function(err, user) {
          if(err) {
            return done(err);
          }
          if(!user) {
            return done(null, false);
          }
          return done(null, user, { scope: 'read' })
        });

        // // console.log('token', token);
        // //TODO: find user with token then run callback with user
        // // if (token == 'Ci9zA8DD8I8WGVOuSTGWxT6j5liMz9buxSOFh9nHvam2docwk') {
        // if (token) {//== 'ya29.Ci90A7FswNwfeEhC-r9nKQUkmCCUEXqzaBl3Qe3hB6EnaZGU74rr47WhtB835smvhg') {
        //     var user = {user: 'bob'};
        //     return done(null, user, {scope: 'read'});
        // } else {
        //     return done(null, false);
        // }

    }
));


passport.use(new googleStrategy({
    clientID: '525886096245-th0hhdgnfprvn1pp2pruv4bcr1ds2j73.apps.googleusercontent.com',
    clientSecret: 'qGo2alB2CSMDdExUvIIyKxY7',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
console.log(profile);
    // var user = {
    //   profile: profile.id,
    //   accessToken: accessToken,
    //   displayName: profile.displayName
    // }
    // return cb(null, user); //==>> req.user
    User.findOne({googleID: profile.id}, function(err, user) {
      if (!user) {
        User.create({
          googleID: profile.id,
          accessToken: accessToken,
          displayName: profile.displayName,
          words: words
        }, function(err, user) {
          return done(err, user);
        });
      } else {
        return done(err, user);
      }
    }
     // 	{googleId: profile.id},
	    // {
	    // 	displayName: profile.displayName,
	    // 	accessToken: accessToken
      // },
	    // {	upsert:true,
	    // 	new:true,
      //   setDefaultsOnInsert: true
	    // },
	    // function(err, user){
      // 		if(err){
      // 			console.log('error: ', err);
      // 		} else {
      // 			console.log('displayName:', user);
      // 			return done(null, user);
      // 		}}
     );
  }));



// app.use(passport.initialize());
// app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));
app.get('/auth/google/callback',
  passport.authenticate('google', { scope: ['profile'], failureRedirect: '/login/google', session: false }),
  function(req, res) {
    // console.log("return log", res);
    res.cookie('accessToken', req.user.accessToken, {expires: 0})
    res.redirect('/#/learn');
});


// console.log("Log from line58", words);

var questionIndex = 0;
var userScore = 0;

app.get('/api/words',
  passport.authenticate('bearer', {session: false }),
  function(req, res) {
    var googleID = req.user.googleID
    // ask mongoose for the array, then call alogrithm([)
    User.findOne({googleID: googleID}), function(err, user) {
      if(err) {
        console.log("user error: " )
        res.send("Error has occured")
      } else {
        console.log("user: ",user);
        res.json(user);
      }
    }

    // res.json({algorithm: algorithm[questionIndex],
    //           userScore: userScore});
    // console.log(algorithm[questionIndex]);
});

app.post('/api/words',
  passport.authenticate('bearer', {session: false }),
  function(req, res) {
    // console.log(req.body);
    var idx = algorithm[questionIndex].id;
    var isAnswerCorrect;
    var userAnswer = req.body.userAnswer;
    // console.log('word to compare', algorithm[questionIndex].english)
    if (userAnswer === algorithm[questionIndex].english) {


      // console.log("idx: ",idx)
      words[idx].correct += 1
      words[idx].last += 1
      words[idx].attempted = true
      // console.log("words: ",words[idx]);
      userScore = userScore += 10;
      isAnswerCorrect = 'true';
    } else {
      userScore = userScore;
      isAnswerCorrect = 'false';
      words[idx].last += 1
      words[idx].attempted = true
      // console.log("words: ",words[idx]);
    }
    // console.log(userScore);
    res.json({algorithm: algorithm[questionIndex],
              userScore: userScore,
              isAnswerCorrect: isAnswerCorrect});
    // console.log(algorithm[questionIndex]);
    questionIndex++;
});
app.get('/logout', function (req, res) {
    // console.log('req.user before', req.user)
    req.logout();
    // console.log('req.user after', req.user)
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
