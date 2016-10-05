var React = require('react');
var ReactDOM = require('react-dom');

var UserAnswerInput = function(props) {
    return (
        <div>
          <form onSubmit={props.handleSubmit}>
            <input type='text' value={props.value} onChange={props.handleChange}/>
            <button type='submit'>Submit Answer</button>
          </form>
        </div>
    );
  };

module.exports = UserAnswerInput;
