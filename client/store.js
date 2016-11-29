import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import germanXReducer from './reducers';

const store = createStore(germanXReducer, applyMiddleware(thunk));
export default store;
