var React = require('react');
var ReactDOM = require('react-dom');

var WelcomeMessage = function(props) {
    return(
    <div className = 'welcome-message'>
    {props.hasPlayed == 'false'
        ?
        <p>
        Hello {props.user}, welcome to German-X, ready to get started?
    </p>
        :
        <p>
       Welcome back {props.user}, your previous score was {props.userScore}, ready to start again?
   </p>
   }
    </div>
    )
};

module.exports = WelcomeMessage;
