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
  setComplete: 'false',
  buttonStyle: {display: 'inline'}

};

var germanXReducer = function(state, action) {
    state = state || initialState;
    if (action.type === actions.FETCH_DATA_SUCCESS) {
      console.log(action.data)
      var newState = update(state, {
        germanWord: {$set: action.data.algorithm.german},
        correctWord: {$set: action.data.algorithm.english},
        userScore: {$set: action.data.userScore}
      });

      return newState;
  }
    else if (action.type === actions.FETCH_DATA_ERROR) {
      console.log(action.error);
    return state;
        };
     if (action.type === actions.START_GAME) {
            console.log(state)
      var newState = update(state, {
        inProgress: {$set: 'true'}
      });

      return newState;
    }
    if (action.type === actions.POST_ANSWER_SUCCESS) {
      //TODO: handle right/wrong answer, score
      console.log(action.data);
      var newState = update(state, {
        isAnswerCorrect: {$set: action.data.isAnswerCorrect},
        userScore: {$set: action.data.userScore},
        //germanWord: {$set: action.data.word.german},
        //correctWord: {$set: action.data.word.english},
        answerSubmitted: {$set: 'true'},
        buttonStyle: {display: {$set: 'none'}}
      });
      return newState;
    }
    else if (action.type === actions.POST_DATA_ERROR) {
      console.log(action.error);
    return state;
        };
    if (action.type === actions.GET_NEXTWORD_SUCCESS) {
      console.log(action.data);
       var newState = update(state, {
        germanWord: {$set: action.data.algorithm.german},
        correctWord: {$set: action.data.algorithm.english},
        answerSubmitted: {$set: 'false'},
        buttonStyle: {display: {$set: 'inline'}}
      });
       return newState;
    }
    else if (action.type === actions.GET_NEXTWORD_ERROR){
      console.log(action.error);
      return state;
    }
    return state;
};

exports.germanXReducer = germanXReducer;
