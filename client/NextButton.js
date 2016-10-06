var React = require('react');
var ReactDOM = require('react-dom');

var NextButton = function(props) {
   return (
    <div className="next-button">
    <input type="button" value="Next" onClick={props.nextWord}>
    </input>
    </div>
    );
};

module.exports = NextButton;
