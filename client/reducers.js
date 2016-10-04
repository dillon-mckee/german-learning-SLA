var actions = require('./actions');

var initialState = {status: []};

var germanXReducer = function(state, action) {
    state = state || initialState;
    if (action.type === actions.FETCH_DATA_SUCCESS) {
      // TODO: add react immutability helpers
        console.log(action.data);
      return { status: action.data }


    } else if (action.type === actions.FETCH_DATA_ERROR) {
      console.log(action.error);
    }
    return state;
};

exports.germanXReducer = germanXReducer;
