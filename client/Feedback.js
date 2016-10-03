var React = require('react');
var ReactDOM = require('react-dom');

var Feedback = function(props) {
    return(
        <div className='feedback'>
        <h3>Your answer was {props.isAnswerCorrect == 'false' ? 'incorrect' : 'correct!'}</h3>
        </div>
        );
};

module.exports = Feedback;
