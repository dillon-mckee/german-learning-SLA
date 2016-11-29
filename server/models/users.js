var mongoose = require('mongoose');
var words = require('./words').words;

var UserSchema = new mongoose.Schema({
  googleId: { type: String, index: true},
  accessToken: String,
  displayName: String,
  words: {type: Array, default: words},
  userScore: {type: Number, default: 0},
  questionIndex: {type: Number, default: 0}
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
