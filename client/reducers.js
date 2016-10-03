var actions = require('./actions');

var initialState = {todos: []};

var todoReducer = function(state, action) {
    state = state || initialState;
    if(action.type === actions.FETCH_TODO_SUCCESS) {
      // TODO: add react immutability helpers
      return { todos: action.data.todos }

    } else if (action.type === actions.FETCH_TODO_ERROR) {
      console.log(action.error);
    }
    return state;
};

exports.todoReducer = todoReducer;
