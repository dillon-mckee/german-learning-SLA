var React = require('react');
var ReactDOM = require('react-dom');

var WordDisplay = function(props) {
    return(
    <div className ='word-display'>
    {props.germanWord}
    </div>
    );
}

module.exports = WordDisplay;
