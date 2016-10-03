var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./Header');
var NextButton = require('./NextButton');
var UserInfo = require('./UserInfo');
var WordDisplay = require('./WordDisplay')
var Feedback = require('./Feedback');
var CorrectWordDisplay = require('./CorrectWordDisplay');
var InputContainer = require('./input');


var LearningWindow = React.createClass({
nextWord: function() {

},
componentDidMount: function() {
    this.props.dispatch(actions.fetchData());
  },

render: function() {
    return(
        <div className='learning-window'>
        <Header/>
        <WordDisplay germanWord="Woche"/>
        <UserInfo user='bob' userScore='5'/>
        <NextButton onClick={this.nextWord}/>
        <CorrectWordDisplay correctWord='week'/>
        <Feedback isAnswerCorrect='false'/>
        <InputContainer/>
        </div>
        )
}

});

LearningWindow.defaultProps = {
    correctWord: 'Woche'
};

module.exports = LearningWindow;
