import React, { PropTypes } from 'react';
import { Bar } from 'react-chartjs-2';
import { map, nth, pipe, equals } from 'ramda';

import { likertColors } from '../constants/colors';
import { count } from '../utils/count';

const likertQuestionRequiredProps = {
  question: PropTypes.object
};

function LikertQuestion({ question, question: { answers } }) {

  const labels = [
    "trifft zu",
    "trifft eher zu",
    "teils-teils",
    "trifft eher nicht zu",
    "trifft nicht zu"
  ];

  const stats = labels.map((choice, i) => (
    [choice, count(pipe(nth(1), equals(i)), answers)]
  ));

  const data = {
    labels: map(nth(0), stats),
    datasets: [
    {
      data: map(nth(1), stats),
      backgroundColor: likertColors,
      hoverBackgroundColor: likertColors
    }]
  };

  const options = {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          stepSize: 1.0
        }
      }]
    }
  };

  return (
    <div className="question">
      <h1>{question.text}</h1>
      <Bar data={data} options={options} />
    </div>
  );
}

LikertQuestion.propTypes = likertQuestionRequiredProps;

export default LikertQuestion;
