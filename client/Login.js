var React = require('react');
var ReactDOM = require('react-dom');
var Banner = require('./Banner');
var Login = function(props) {
   return (
    <div className="login-button">
    <Banner/>
    <input type="button" value="Login with Google" onClick={props.onClick}>
    </input>
    </div>
    );
};

module.exports = Login;
