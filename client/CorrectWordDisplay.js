var React = require('react');
var ReactDOM = require('react-dom');

var CorrectWordDisplay = function(props) {
    return(
    <p>
    {props.correctWord}
</p>

    );
};

module.exports = CorrectWordDisplay;
