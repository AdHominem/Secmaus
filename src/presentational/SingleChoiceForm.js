import React, { PropTypes } from 'react';

const singleChoiceQuestionFormRequiredProps = {
  question: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

function SingleChoiceForm({ question, value, onChange }) {
  return (
    <div className="question">
      <h1>{question.text}</h1>
      <form>
      { question.choices.map((choice, i) => (
          <label key={i}>
            <input
              type="radio" name={choice}
              checked={value === i}
              onChange={onChange(i)}
            />
            {choice}
          </label>
        )) }
      </form>
    </div>
  );
}

SingleChoiceForm.propTypes = singleChoiceQuestionFormRequiredProps;

export default SingleChoiceForm;
