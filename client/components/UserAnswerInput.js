import React from 'react';

const UserAnswerInput = (props) => {
    return (
          <form id='answer-form' onSubmit={props.handleSubmit}>
            <input className='input-box' type='text' value={props.value} onChange={props.handleChange}/>
          </form>
    );
  };

export default UserAnswerInput;
