import React, { PropTypes, Component } from 'react';

const SingleChoiceForm = ({ question, value, onChange }) =>
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
  </div>;

export default SingleChoiceForm;
