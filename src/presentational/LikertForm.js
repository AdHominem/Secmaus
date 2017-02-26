import React, { PropTypes } from 'react';

import { likertLabels } from '../constants/labels.js';

const likertFormRequiredProps = {
  question: PropTypes.object,
  value: PropTypes.number,
  onChange: PropTypes.func
};

function LikertForm({ question, value, onChange }) {
  return (
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
    );
}

LikertForm.propTypes = likertFormRequiredProps;

export default LikertForm;
