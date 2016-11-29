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
    console.log(this.props);
    this.props.dispatch(actions.postData(this.state.userAnswer));
    },
    startGame: function(){
        this.props.dispatch(actions.startGame());
        console.log(this.props);
    },
    nextWord: function() {
        this.props.dispatch(actions.nextWord());
    },
    newGame: function(){

    },
    componentDidMount: function() {
    this.props.dispatch(actions.fetchData());
  },
render: function() {
    return(
        <div className='learning-window'>
            <section>
                <span>
            <button type="button" className="button"><a href="/login/google"> login </a></button>
        </span>
            <button type="button" className="button"><a href="/logout"> logout </a></button>
            <Header/>
            </section>

            {/*Hide/Show WelcomeMessage/StartButton and UserAnswerInput/UserInfo based off of props.inProgress*/}
            <section>
            {this.props.inProgress == 'false' ?
                <div className='welcome-and-start'>
                    <WelcomeMessage user={this.props.user} hasPlayed={this.props.hasPlayed}/>
                    <StartButton handleStart={this.startGame}/>
                </div>
                :
                <div className='word-displays-and-input-and-userinfo'>
                    <WordDisplay germanWord={this.props.germanWord}/>
                    <span>
                    {/*Hide/Show CorrectWordDisplay, feedback and NextButton based off of props.answerSubmitted*/}
                    {this.props.answerSubmitted == 'true' ?
                            <CorrectWordDisplay correctWord={this.props.correctWord}/>
                        : null
                    }
                </span>
                    <UserAnswerInput buttonStyle={this.props.buttonStyle} value={this.state.userAnswer} handleChange={this.updateTextInput} handleSubmit={this.handleSubmit}/>
                    {this.props.answerSubmitted == 'true' ?
                    <span>
                            <Feedback isAnswerCorrect={this.props.isAnswerCorrect}/>
                            <NextButton nextWord={this.nextWord}/>
                        </span>
                        : <span></span>
                    }
        <UserInfo user={this.props.user} userScore={this.props.userScore}/>
        </div>
                 }
 {/*Hide/Show NewGameButton based off of props.setComplete*/}
        {this.props.setComplete == 'true' ?
            <NewGameButton onClick={this.newGame}/>
            : null
                 }
                 </section>
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
  setComplete: state.setComplete,
  buttonStyle: state.buttonStyle,
  nextGermanWord: state.nextGermanWord,
  nextEnglishWord: state.nextEnglishWord
    };
};

var Container = connect(mapStateToProps)(LearningWindow);

module.exports = Container;
