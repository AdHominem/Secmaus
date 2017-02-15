import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/pollsActions';
import { Pie } from 'react-chartjs-2';
import { map, nth, pipe, equals } from 'ramda';
import { singleChoiceColors } from '../../constants/colors';
import { count } from '../../utils/count';

const SingleChoiceQuestion = props => {
  const { question, question: { choices, answers } } = props;

  const stats = choices.map((choice, i) => (
    [choice, count(pipe(nth(1), equals(i)), answers)]
  ));

  const data = {
    labels: map(nth(0), stats),
    datasets: [
    {
      data: map(nth(1), stats),
      backgroundColor: singleChoiceColors,
      hoverBackgroundColor: singleChoiceColors,
    }]
  };

  return (
    <div className="question">
      <h1>{question.text}</h1>
      <Pie data={data} />
    </div>
  );
}

export default SingleChoiceQuestion;
