const express = require('express');
const app = express();
const routes = require('./routes')
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const bearerStrategy = require('passport-http-bearer').Strategy;
const bodyParser = require('body-parser');
const algorithm = require('./models/algorithm');
const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/users');
const words = require('./models/words').words;
const algo = require('./models/algorithm');
const _ = require('underscore');

const HOST = process.env.HOST;
const PORT = config.PORT || 3000;
mongoose.connect(config.DATABASE_URL, (err)=> {
    if (err && callback) {
      return callback(err);
    }
});
mongoose.connection.on('error', (err)=> {
    console.error('MongoDB error: %s', err);
});
app.use(bodyParser.json());
app.use('/', express.static('build'));
app.use(passport.initialize());

passport.use(new googleStrategy({
    clientID: process.env.CLIENTID || '525886096245-th0hhdgnfprvn1pp2pruv4bcr1ds2j73.apps.googleusercontent.com',
    clientSecret: process.env.CLIENTSECRET || 'qGo2alB2CSMDdExUvIIyKxY7',
    callbackURL: process.env.CALLBACKURL || 'https://sleepy-lowlands-87122.herokuapp.com/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done)=> {
    User.findOne({googleID: profile.id}, (err, user)=> {
      if (!user) {
        User.create({
          googleID: profile.id,
          accessToken: accessToken,
          displayName: profile.displayName,
          words: words
        }, (err, user)=> {
          return done(err, user);
        });
      } else {

        return done(err, user);
      }
    }

     );
  }));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login/google', session: false }),
  (req, res)=> {
    res.cookie('accessToken', req.user.accessToken, {expires: 0})
    res.redirect('/#/learn');
});

passport.use(new bearerStrategy(
     (token, done)=> {
      User.findOne({accessToken: token},
        (err, user)=> {
          if(err) {
            return done(err);
          }
          if(!user) {
            return done(null, false);
          }
          return done(null, user, { scope: 'read' })
        });
    }
));

var questionIndex = 0;
var shuffled = [];
var Arr = [];
app.get('/api/words',
  passport.authenticate('bearer', {session: false }),
  (req, res)=> {
    var googleID = req.user.googleID;
    User.findOne({googleID: googleID}, (err, user)=> {
      if(err) {
        console.log("user error: " );
        res.send("Error has occured");

      } else if(Arr.length === 0) {
        console.log("Arr = null")
        Arr = algo(user.words);
        shuffled = _.shuffle(Arr)
        var data = {word: shuffled[questionIndex],
                    userScore: user.userScore,
                    user: user.displayName,
                    hasPlayed: user.hasPlayed};
        questionIndex ++;
        res.json(data);
        console.log('get hit');

      } else if(questionIndex == shuffled.length) {
        res.json({word: {german: "Thanks for playing!!!"}});
        questionIndex = 0;
        Arr = [];
        shuffled = [];

      } else {
        console.log('3rd option', shuffled[questionIndex])
        res.json({word: shuffled[questionIndex]});
        questionIndex ++;
        console.log('get hit');
      }
    })
  });

app.post('/api/words',
  passport.authenticate('bearer', {session: false }),
    (req, res)=> {
    console.log('questionIndex: ',questionIndex);
    var idx = shuffled[questionIndex - 1].id;
    var isAnswerCorrect;
    var userAnswer = req.body.userAnswer;
    if (userAnswer === shuffled[questionIndex - 1].english) {
      User.findOneAndUpdate({ 'googleID': req.user.googleID, 'words.id': idx },
        { $set: {'words.$.attempted': true, 'hasPlayed': true} ,
         $inc: {'words.$.correct': 1, 'words.$.last': 1, 'userScore': 10} },
        (err, user)=> {
        if(err) {
          console.log("error :",err )
        }
        console.log("ok")
      isAnswerCorrect = 'true';
      res.json({word: shuffled[questionIndex - 1],
                userScore: user.userScore,
                isAnswerCorrect: isAnswerCorrect});
      })
    } else {
      User.findOneAndUpdate({ 'googleID': req.user.googleID, 'words.id': idx },
        { $set: {'words.$.attempted': true, hasPlayed: true} ,
        $inc: {'words.$.last': 1} },
      (err, user)=> {
        if(err) {
          console.log("error :",err )
        }
        console.log("ok")
        isAnswerCorrect = 'false';

        res.json({word: shuffled[questionIndex - 1],
                  userScore: user.userScore,
                  isAnswerCorrect: isAnswerCorrect});
        })
    }
    console.log('post hit');
    console.log('idx: ',idx);
});
app.get('/logout', (req, res)=> {
    questionIndex = 0;
    Arr = [];
    shuffled = [];
    req.logout();
    res.redirect('/');
});

// app.use('/', routes)

var runServer = function(callback) {
   mongoose.createConnection(config.DATABASE_URL, function(err) {
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
}

// function runServer() {
//     return new Promise((resolve, reject) => {
//         app.listen(PORT, HOST, (err) => {
//             if (err) {
//                 console.error(err);
//                 reject(err);
//             }
//
//             const host = HOST || 'localhost';
//             console.log(`Listening on ${host}:${PORT}`);
//         });
//     });
// }

// if (require.main === module) {
//   runServer(function(err) {
//     if (err) {
//         console.error(err);
//     }
//   });
// };

exports.app = app;
exports.runServer = runServer;
