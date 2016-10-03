/** Declaring dependencies */
var React = require('react');
var actions = require('./actions');
var connect = require('react-redux').connect;

/**
* Input constructor
* @namespace InputContainer
* @constructor
* Renders an input box with a submit button to allow user to make a game guess
* Allows user to input a guess into the game that gets dispatched to an action
*/
var InputContainer = React.createClass({
  onGuessSubmit: function(event) {
      event.preventDefault();
        var userAnswer = this.refs.userInput.value;
        this.props.dispatch(actions.makeGuess(userNum));
        this.props.dispatch(
            actions.fetchDescription(this.props.repository.name)
        );
        this.refs.userInput.value = null;
    },

    render: function(){
      return(
        <div className="inputField">
            <form onSubmit={this.onGuessSubmit}>
              <input type="text" ref="userInput" /><button name="input-button">Guess</button>
              </form>
          </div>)
    }
});

/** Connect the state with the InputContainer constructor */
var Container = connect()(InputContainer);

/** Exports the InputContainer that has been connected with the state */
//module.exports = Container;

module.exports = InputContainer;
