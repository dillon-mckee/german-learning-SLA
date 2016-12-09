import React from 'react';

const Feedback = (props) => {
    return(
        <h1>Your answer was {props.isAnswerCorrect == 'false' ? 'incorrect' : 'correct!'}</h1>

        );
};

export default Feedback;
