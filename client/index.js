
var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;

var store = require('./store');
var List = require('./List');

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        <Provider store={store}>
            <List />
        </Provider>,
    document.getElementById('app'));
});
