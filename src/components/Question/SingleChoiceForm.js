import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/pollsActions';

const SingleChoiceForm = props => {
  const { question, value, onChange } = props;

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

export default SingleChoiceForm;
