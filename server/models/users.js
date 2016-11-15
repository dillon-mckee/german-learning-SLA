var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  googleId: { type: String, index: true},
  accessToken: String,
  displayName: String,
  percentages: {type: Array, default:[2, 2, 2, 2, 2]},
  userScore: {type: Number, default: 0},
  questionIndex: {type: Number, default: 0}
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
