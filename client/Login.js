var React = require('react');
var ReactDOM = require('react-dom');
var Banner = require('./Banner');
var Login = function(props) {
   return (
    <div className="login-button">
    <Banner/>
    <section>
<button type="button" className="button"><a href="/auth/google"> login </a></button>
</section>
    </div>
    );
};

module.exports = Login;
