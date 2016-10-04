var React = require('react');
var ReactDOM = require('react-dom');

var Header = require('./Header');
var NextButton = require('./NextButton');
var UserInfo = require('./UserInfo');
var WordDisplay = require('./WordDisplay')
var Feedback = require('./Feedback');
var CorrectWordDisplay = require('./CorrectWordDisplay');
var WelcomeMessage = require('./WelcomeMessage');
var NewGameButton = require('./NewGameButton')
var UserAnswerInput = require('./UserAnswerInput')

var connect = require('react-redux').connect;

var actions = require('./actions');


var LearningWindow = React.createClass({
    getInitialState: function() {
        return {
            userAnswer: ''
        };
    },
    updateTextInput: function(event) {
    this.setState({
        userAnswer: event.target.value
    })
    console.log(this.state.userAnswer);
    },
    handleSubmit: function(event) {
    event.preventDefault();
    console.log(userAnswer);
    //this.props.dispatch(actions.postData(e.target.value));
    },
    nextWord: function() {
    ReactDOM.findDOMNode(this.refs.myInput).value = "";
    },
    newGame: function(){

    },
    componentDidMount: function() {
    this.props.dispatch(actions.fetchData());
    console.log(this.props.status)
  },
render: function() {
    return(
        <div className='learning-window'>
        <Header/>
        <WelcomeMessage user='bob' hasPlayed='true'/>
        <WordDisplay germanWord="Woche"/>
        <CorrectWordDisplay correctWord='week' />
        <NextButton onClick={this.nextWord}/>
        <Feedback isAnswerCorrect='false'/>
        <UserAnswerInput value={this.state.userAnswer} handleChange={this.updateTextInput} onSubmit={this.handleSubmit}/>
        <UserInfo user='bob' userScore='5'/>
        <NewGameButton onClick={this.newGame}/>
        </div>
        )
}

});

var mapStateToProps = function(state, props) {
    return {
        status: state.status
    };
};

var Container = connect(mapStateToProps)(LearningWindow);

module.exports = Container;
