var React = require('react');
var ReactDOM = require('react-dom');

var UserAnswerInput = function(props) {
    return (
        <div className ="answer-form-div">
          <form id='answer-form' onSubmit={props.handleSubmit}>
            <input className='input-box' type='text' value={props.value} onChange={props.handleChange}/>
            <button style={props.buttonStyle} className='submit-button' type='submit'>Submit Answer</button>
          </form>
        </div>
    );
  };

module.exports = UserAnswerInput;
