var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;
var actions = require('./actions');

var store = require('./store');
var LearningWindow = require('./LearningWindow');

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        <Provider store={store}>
        <LearningWindow/>
        </Provider>,
    document.getElementById('app'));
});
