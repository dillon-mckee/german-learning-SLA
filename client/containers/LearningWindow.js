import React from 'react';
import { connect } from 'react-redux';
import { postData, fetchData, startGame, nextWord } from '../redux/actions';


import Header from '../components/Header';
import Feedback from '../components/Feedback';
import UserAnswerInput from '../components/UserAnswerInput';

class LearningWindow extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.startGame = this.startGame.bind(this);
      this.nextWord = this.nextWord.bind(this);
      this.updateTextInput = this.updateTextInput.bind(this);
  }

    componentDidMount() {
        this.props.dispatch(fetchData());
        this.setState({
            userAnswer: ''
        })
    }

    updateTextInput(event) {
    this.setState({
        userAnswer: event.target.value
    })
    console.log(this.state.userAnswer);
    }

    handleSubmit(event) {
    event.preventDefault();
    console.log(this.props);
    this.props.dispatch(postData(this.state.userAnswer));
    }

    startGame(){
        this.props.dispatch(startGame());
        console.log(this.props);
    }

    nextWord() {
        this.setState({
            userAnswer: ''
        })
        this.props.dispatch(nextWord());
    }

    newGame(){

    }

    render() {
        return(
        <div className='learning-window'>
            <section>
                <button type="button" className="button"><a href="/logout"> logout </a></button>
            <Header/>
            </section>

            {/*Hide/Show WelcomeMessage/StartButton and UserAnswerInput/UserInfo based off of props.inProgress*/}
            <section>
            {this.props.inProgress == 'false' ?
                <div className='welcome-and-start'>
                    <div className = 'welcome-message'>
                        {this.props.hasPlayed == 'false'
                            ?
                            <p>Hello {this.props.user}, welcome to German-X, ready to get started?</p>
                            :
                            <p>Welcome back {this.props.user}, your previous score was {this.props.userScore}, ready to start again?</p>
                       }
                    </div>
                    <div className="button">
                        <input className="button" type="button" value="Start" onClick={this.startGame}></input>
                    </div>
                </div>
                :
                <div className='word-displays-and-input-and-userinfo'>
                    <p>{this.props.germanWord}</p>
                    <span>
                        {/*Hide/Show CorrectWordDisplay, feedback and NextButton based off of props.answerSubmitted*/}
                            {this.props.answerSubmitted == 'true' ?
                            <p>{this.props.correctWord}</p>
                            : null
                            }
                    </span>
                    <UserAnswerInput buttonStyle={this.props.buttonStyle} value={this.state.userAnswer} handleChange={this.updateTextInput} handleSubmit={this.handleSubmit}/>
                        {this.props.answerSubmitted == 'true' ?
                        <span>
                                <Feedback isAnswerCorrect={this.props.isAnswerCorrect}/>
                                <input type="button" value="Next" onClick={this.nextWord}>
                                </input>
                        </span>
                            : <span></span>
                        }
                    <div className = 'score'>
                        <p>{this.props.user}'s Score: {this.props.userScore}</p>
                    </div>
        </div>
                 }
 {/*Hide/Show NewGameButton based off of props.setComplete*/}
        {this.props.setComplete == 'true' ?
        <div className="button">
            <input type="button" value="New Game" onClick={props.onClick}>
            </input>
        </div>
            : null
                 }
                 </section>
        </div>

        )
}
};

function mapStateToProps(state, props) {
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

export default connect(mapStateToProps)(LearningWindow);
