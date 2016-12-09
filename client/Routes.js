import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import { Provider } from 'react-redux';
import LearningWindow from './containers/LearningWindow';
import Login from './components/Login';
import App from './App';
import store from './redux/store';

const Routes = (
	<Provider store={store}>
			<Router history={hashHistory}>
		    	<Route path="/" component={App}>
			        <IndexRoute component={Login} />
		          <Route path="/learn" component={LearningWindow} />
		      </Route>
		    </Router>
		</Provider>
		);



export default Routes;
