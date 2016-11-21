var React = require('react');
var ReactDOM = require('react-dom');

var NextButton = function(props) {
   return (
    <input type="button" value="Next" onClick={props.nextWord}>
    </input>
    );
};

module.exports = NextButton;
