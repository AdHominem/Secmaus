import React, { PropTypes } from 'react';

const freeFormRequiredPropTypes = {
  question: PropTypes.object.isRequired
};

function FreeForm({ question: { text, answers } }) {
  const body = answers.map((answer, i) => <p key={i}>{answer[1]}</p>);

  return (
      <div className="question">
        <h1>{ text }</h1>
        { body }
      </div>
    );
}

FreeForm.propTypes = freeFormRequiredPropTypes;

export default FreeForm;
