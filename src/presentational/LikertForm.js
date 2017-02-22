import React, { PropTypes, Component } from 'react';
import { likertLabels } from '../constants/labels.js';

const LikertForm = ({ question, value, onChange }) =>
  <div className="question">
      <h1>{question.text}</h1>
      <form>
        <ul className="likert">
        { likertLabels.map((label, i) => (
            <li key={i}>
              <label>
                <input
                  type="radio" name={label}
                  checked={value === i}
                  onChange={onChange(i)}
                />
                {label}
              </label>
            </li>
          )) }
        </ul>
      </form>
    </div>

export default LikertForm;
