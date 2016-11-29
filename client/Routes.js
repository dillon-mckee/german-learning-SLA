var React = require('react');
var Provider = require("react-redux").Provider;
var store = require("./store");
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var IndexRoute = router.IndexRoute;
var hashHistory = router.hashHistory;
var Link = router.Link;
var App = require('./App');
var Login = require('./Login');
var LearningWindow = require('./LearningWindow');




var routes = (
	<Provider store={store}>
    <Router history={hashHistory}>
    	<Route path="/" component={App}>
	        <IndexRoute component={Login} />
          <Route path="/learn" component={LearningWindow} />
      </Route>
    </Router>
    </Provider>
);


module.exports = routes;
