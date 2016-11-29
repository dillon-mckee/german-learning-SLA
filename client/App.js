var React = require('react');
var ReactDOM = require('react-dom');

var App = function(props){

	return (
		<div id="App">
			{props.children}
		</div>

		)




};

module.exports = App;
