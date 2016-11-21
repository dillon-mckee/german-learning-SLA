var React = require('react');
var ReactDOM = require('react-dom');

var UserInfo = function(props) {
    return (
    <div className = 'score'>
    <p>{props.user}'s Score: {props.userScore}</p>
    </div>
    );
};

module.exports = UserInfo;
