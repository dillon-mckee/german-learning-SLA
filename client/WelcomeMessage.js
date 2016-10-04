var React = require('react');
var ReactDOM = require('react-dom');
var StartButton = require('./StartButton');

var WelcomeMessage = React.createClass({
    StartGame: function() {

    },
    render: function(){

    return(
    <div className = 'welcome-message'>
    {this.props.hasPlayed == 'false'
        ?
        <h3>
        Hello {this.props.user}, welcome to GermanX, ready to get started?
        </h3>
        :
        <h3>
       Welcome back {this.props.user}, your previous score was {this.props.userScore}, ready to start again?
       </h3>
   }

        <StartButton onClick={this.StartGame}/>
    </div>
    )
}
});

module.exports = WelcomeMessage;
