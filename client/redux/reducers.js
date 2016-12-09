import actions from './actions';
import update from 'react-addons-update';

const initialState = {
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

const germanXReducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case 'FETCH_DATA_SUCCESS':
            console.log(action.data);
            return update(state, {
              user: {$set: action.data.user},
              germanWord: {$set: action.data.word.german},
              correctWord: {$set: action.data.word.english},
              userScore: {$set: action.data.userScore},
              hasPlayed: {$set: action.data.hasPlayed}
    });
        case 'FETCH_DATA_ERROR':
            console.log(action.data);
            console.log(action.error);
        return state;
        case 'START_GAME':
            return update(state, {
              inProgress: {$set: 'true'}
            });
        case 'POST_ANSWER_SUCCESS':
            return update(state, {
              isAnswerCorrect: {$set: action.data.isAnswerCorrect},
              userScore: {$set: action.data.userScore},
              germanWord: {$set: action.data.word.german},
              correctWord: {$set: action.data.word.english},
              answerSubmitted: {$set: 'true'},
              buttonStyle: {display: {$set: 'none'}}
            });
        case 'POST_DATA_ERROR':
            console.log(action.error);
            return state;
        case 'GET_NEXTWORD_SUCCESS':
            return update(state, {
             germanWord: {$set: action.data.word.german},
             correctWord: {$set: action.data.word.english},
             answerSubmitted: {$set: 'false'},
             buttonStyle: {display: {$set: 'inline'}}
           });
        case 'GET_NEXTWORD_ERROR':
            console.log(action.error);
            return state;
        default:
            return state;
        };
};

export default germanXReducer;
