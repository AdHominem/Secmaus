import React, { PropTypes } from 'react';

const freeFormFormRequiredPropTypes = {
  question: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func
};

function FreeFormForm({ onChange, value, question: { text } }) {
  return (
    <div className="question">
      <h1>Free Form {text}</h1>
      <input
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

FreeFormForm.propTypes = freeFormFormRequiredPropTypes;

export default FreeFormForm;
