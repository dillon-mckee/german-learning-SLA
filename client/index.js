var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;
var actions = require('./actions');

var store = require('./store');
var routes = require('./routes');

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        routes,
    document.getElementById('app'));
});
