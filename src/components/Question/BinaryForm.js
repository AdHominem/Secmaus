import React, { PropTypes, Component } from 'react';

const BinaryForm = ({ question, value, onChange }) =>
  <div className="question">
    <h1>{question.text}</h1>
    <form>
      <div className="button-group">
        <label>
          <input
            type="radio" name="yes"
            checked={value === 0}
            onChange={onChange(0)}
          />
          <span className="button-group-item button-group-item--yes">Ja</span>
        </label>
        <label>
          <input
            type="radio"
            name="no"
            checked={value === 1}
            onChange={onChange(1)}
          />
          <span className="button-group-item button-group-item--no">Nein</span>
        </label>
      </div>
    </form>
  </div>;

export default BinaryForm;
