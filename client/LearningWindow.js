var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./Header');
var NextButton = require('./NextButton');
var UserInfo = require('./UserInfo');
var WordDisplay = require('./WordDisplay')
var Feedback = require('./Feedback');
var CorrectWordDisplay = require('./CorrectWordDisplay');
var InputContainer = require('./input');
var WelcomeMessage = require('./WelcomeMessage');


var LearningWindow = React.createClass({
nextWord: function() {

},
componentDidMount: function() {
  },

render: function() {
    return(
        <div className='learning-window'>
        <Header/>
        <WelcomeMessage user='bob' hasPlayed='true'/>
        <WordDisplay germanWord="Woche"/>
        <CorrectWordDisplay />
        <NextButton onClick={this.nextWord}/>
        <Feedback isAnswerCorrect='false'/>
        <InputContainer/>
        <UserInfo user='bob' userScore='5'/>
        </div>
        )
}

});

//LearningWindow.defaultProps = {
//    correctWord: 'Woche'
//};

module.exports = LearningWindow;
