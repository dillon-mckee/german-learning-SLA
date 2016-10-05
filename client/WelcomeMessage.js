var React = require('react');
var ReactDOM = require('react-dom');

var WelcomeMessage = function(props) {
    return(
    <div className = 'welcome-message'>
    {props.hasPlayed == 'false'
        ?
        <h3>
        Hello {props.user}, welcome to GermanX, ready to get started?
        </h3>
        :
        <h3>
       Welcome back {props.user}, your previous score was {props.userScore}, ready to start again?
       </h3>
   }
    </div>
    )
};

module.exports = WelcomeMessage;
