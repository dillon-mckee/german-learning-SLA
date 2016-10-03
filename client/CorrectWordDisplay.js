var React = require('react');
var ReactDOM = require('react-dom');

var CorrectWordDisplay = function(props) {
    return(
    <div className='correct-word-display'>
    {props.correctWord}
    </div>
    );
};

module.exports = CorrectWordDisplay;
