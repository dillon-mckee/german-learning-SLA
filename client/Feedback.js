var React = require('react');
var ReactDOM = require('react-dom');

var Feedback = function(props) {
    return(
        <h1>Your answer was {props.isAnswerCorrect == 'false' ? 'incorrect' : 'correct!'}</h1>

        );
};

module.exports = Feedback;
