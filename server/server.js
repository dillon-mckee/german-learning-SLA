var express = require('express');
var app = express();
var passport = require('passport');
var Strategy = require('passport-google-oauth20').Strategy;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mongoose = require('mongoose');
var config = require('./config');


passport.use(new Strategy({
    clientID: '525886096245-th0hhdgnfprvn1pp2pruv4bcr1ds2j73.apps.googleusercontent.com',
    clientSecret: 'qGo2alB2CSMDdExUvIIyKxY7',
    callbackURL: 'http://localhost:3000/germanx'
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));

  passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use('/', express.static('build'));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login/facebook',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/login/facebook/return',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

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


var words = [
  {
    id: '0',
    german: 'heute',
    english: 'today'
  },
  {
    id: '1',
    german: 'Woche',
    english: 'week'
  },
  {
    id: '2',
    german: 'morgen',
    english: 'tomorrow'
  },
  {
    id: '3',
    german: 'gestern',
    english: 'yesterday'
  },
  {
    id: '4',
    german: 'Kalender',
    english: 'calendar'
  },
  {
    id: '5',
    german: 'Stunde',
    english: 'hour'
  },
  {
    id: '6',
    german: 'Sekunde',
    english: 'second'
  }
]

// var todoIndex = 3;
//
//
// app.get('/api/words', function(req, res) {
//   res.json({words: words})
// });
//
// app.post('/api/status', jsonParser, function(req, res) {
//   if (!('title' in req.body)) {
//     return res.sendStatus(400);
//   }
//
//   status.push({id: todoIndex, title: req.body.title, completed: req.body.completed});
//   todoIndex++;
//   res.status(201).json({todos: todos})
// });
//
// app.put('/api/:id', jsonParser, function(req, res) {
//   console.log(req.body)
//   console.log(!('title' in req.body));
//   console.log(!('status' in req.body));
//
//   if (!('title' in req.body ) && !('status' in req.body)) {
//     return res.sendStatus(400);
//   }
//
//   if (req.body.title) {
//     todos[req.params.id].title = req.body.title
//   };
//
//   if (req.body.status) {
//     todos[req.params.id].completed = req.body.status
//   };
//   res.status(201).json({todos: todos})
// });

// app.listen(3000, function () {
//   console.log('Listening at 3000!');
// });

exports.app = app;
exports.runServer = runServer;
