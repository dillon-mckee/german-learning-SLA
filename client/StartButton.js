var React = require('react');
var ReactDOM = require('react-dom');

var StartButton = function(props) {
   return (
    <div className="start-button">
    <input type="button" value="Start" onClick={props.onClick}>
    </input>
    </div>
    );
};


module.exports = StartButton;
