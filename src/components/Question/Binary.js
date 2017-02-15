import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/pollsActions';
import { Pie } from 'react-chartjs-2';
import { map, nth, pipe, equals } from 'ramda';
import { binaryColors } from '../../constants/colors';
import { count } from '../../utils/count';

const BinaryQuestion = props => {
  const { question, question: { choices, answers } } = props;

  const stats = ["Ja", "Nein"].map((choice, i) => (
    [choice, count(pipe(nth(1), equals(i)), answers)]
  ));

  const data = {
    labels: map(nth(0), stats),
    datasets: [
    {
      label: null,
      data: map(nth(1), stats),
      backgroundColor: binaryColors,
      hoverBackgroundColor: binaryColors,
    }]
  };


  return (
    <div className="question">
      <h1>{question.text}</h1>
      <Pie data={data} />
      { /*
      <ul>
        { stats.map((stat, i) =>
            <li>{stat[0]}: {stat[1]}</li>
        )}
      </ul>
      */ }
    </div>
  );
}

export default BinaryQuestion;
