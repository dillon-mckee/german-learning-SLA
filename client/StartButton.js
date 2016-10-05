var React = require('react');
var ReactDOM = require('react-dom');

var StartButton = function(props) {
   return (
    <div className="start-button">
    <input type="button" value="Start" onClick={props.handleStart}>
    </input>
    </div>
    );
};


module.exports = StartButton;
