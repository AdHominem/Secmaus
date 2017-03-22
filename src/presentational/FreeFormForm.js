import React, { PropTypes } from 'react';

const freeFormFormRequiredProps = {
  question: PropTypes.object,
  value: PropTypes.number,
  onChange: PropTypes.func
};

function FreeFormForm({ question: { text }, value, onChange }) {
  return (
    <div className="question">
      <h1>{text}</h1>
      <input
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
    );
}

FreeFormForm.propTypes = freeFormFormRequiredProps;

export default FreeFormForm;
