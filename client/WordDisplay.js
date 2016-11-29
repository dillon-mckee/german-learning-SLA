var React = require('react');
var ReactDOM = require('react-dom');

var WordDisplay = function(props) {
    return(
        <p>
    {props.germanWord}
</p>

    );
}

module.exports = WordDisplay;
