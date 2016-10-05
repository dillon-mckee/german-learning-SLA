var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;

var Header = require('./Header');
var NextButton = require('./NextButton');
var UserInfo = require('./UserInfo');
var WordDisplay = require('./WordDisplay')
var Feedback = require('./Feedback');
var CorrectWordDisplay = require('./CorrectWordDisplay');
var WelcomeMessage = require('./WelcomeMessage');
var NewGameButton = require('./NewGameButton')
var UserAnswerInput = require('./UserAnswerInput')
var StartButton = require('./StartButton')

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
    startGame: function(){
        this.props.dispatch(actions.startGame());
    },
    nextWord: function() {
    ReactDOM.findDOMNode(this.refs.myInput).value = "";
    },
    newGame: function(){

    },
    componentDidMount: function() {
    this.props.dispatch(actions.fetchData());
  },
render: function() {
    console.log(this.props.germanWord);
    return(
        <div className='learning-window'>
        <Header/>

{/*Hide/Show WelcomeMessage/StartButton and UserAnswerInput/UserInfo based off of props.inProgress*/}
        {this.props.inProgress == 'false' ?
            <div className='welcome-and-start'>
            <WelcomeMessage user={this.props.user} hasPlayed={this.props.hasPlayed}/>
            <StartButton handleStart={this.startGame}/>
            </div>
            :
        <div className='word-displays-and-input-and-userinfo'>
        <WordDisplay germanWord={this.props.germanWord}/>
        <CorrectWordDisplay correctWord={this.props.correctWord}/>
        <UserAnswerInput value={this.state.userAnswer} handleChange={this.updateTextInput} onSubmit={this.handleSubmit}/>
        <UserInfo user={this.props.user} userScore={this.props.userScore}/>
        </div>
                 }

{/*Hide/Show feedback and NextButton based off of props.answerSubmitted*/}
        {this.props.answerSubmitted == 'true' ?
            <div className='feedback-and-next'>
            <Feedback isAnswerCorrect={this.props.isAnswerCorrect}/>
            <NextButton onClick={this.nextWord}/>
            </div>
            : null
                 }

 {/*Hide/Show NewGameButton based off of props.setComplete*/}
        {this.props.setComplete == 'true' ?
            <NewGameButton onClick={this.newGame}/>
            : null
                 }
        </div>
        )
}
});

var mapStateToProps = function(state, props) {
    return {
  answerSubmitted: state.answerSubmitted,
  isAnswerCorrect: state.isAnswerCorrect,
  user: state.user,
  userScore: state.userScore,
  correctWord: state.correctWord,
  germanWord: state.germanWord,
  hasPlayed: state.hasPlayed,
  inProgress: state.inProgress,
  isLoggedIn: state.isLoggedIn,
  setComplete: state.setComplete
    };
};

var Container = connect(mapStateToProps)(LearningWindow);

module.exports = Container;
