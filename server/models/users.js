var mongoose = require('mongoose');
var words = require('./words').words;

var UserSchema = new mongoose.Schema({
  googleID:  {type: String , required: true},
  accessToken: { type: String, required: true},
  displayName: String,
  words: {type: Array, default: words},
  userScore: {type: Number, default: 0},
  questionIndex: {type: Number, default: 0},
  hasPlayed: {type: Boolean, default: true}
});

// UserSchema.pre("save", function(next){
//   this.words = 'hello'
//   next()
// });
var User = mongoose.model('User', UserSchema);

module.exports = User;
