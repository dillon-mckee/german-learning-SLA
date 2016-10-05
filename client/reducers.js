var actions = require('./actions');
var update = require('react-addons-update');

var initialState = {
  answerSubmitted: 'false',
  isAnswerCorrect: '',
  user: 'unknown',
  userScore: 0,
  correctWord: '',
  germanWord: '',
  hasPlayed: 'false',
  inProgress: 'false',
  isLoggedIn: 'false',
  setComplete: 'false'

};

var germanXReducer = function(state, action) {
    state = state || initialState;
    if (action.type === actions.FETCH_DATA_SUCCESS) {
      // TODO: add react immutability helpers
      var newState = update(state, {
        germanWord: {$set: action.data[0].german},
        correctWord: {$set: action.data[0].english}
      });

      return newState;
  }
    if (action.type === actions.FETCH_DATA_ERROR) {
      console.log(action.error);
    };
    return state;
    if (action.type === actions.START_GAME) {
            console.log(state)
      var newState = update(state, {
        inProgress: {$set: 'true'}
      });

      return newState;
    }
};

exports.germanXReducer = germanXReducer;
