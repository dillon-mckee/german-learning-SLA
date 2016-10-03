var React = require('react');
var ReactDOM = require('react-dom');

var UserInfo = function(props) {
    return (
    <div className = 'user-info'>
    <h5>{props.user}'s Score: {props.userScore}</h5>
    </div>
    );
};

module.exports = UserInfo;
