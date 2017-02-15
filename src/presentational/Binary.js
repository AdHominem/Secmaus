import React, { PropTypes } from 'react';
import { Pie } from 'react-chartjs-2';
import { map, nth, pipe, equals } from 'ramda';

import { binaryColors } from '../constants/colors';
import { count } from '../utils/count';

const binaryQuestionRequiredProps = {
  question: PropTypes.object.isRequired
};

function BinaryQuestion({ question: { text, answers } }) {

  const stats = ["Ja", "Nein"].map((choice, i) =>
    [choice, count(pipe(nth(1), equals(i)), answers)]
  );

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
      <h1>{text}</h1>
      <Pie data={data} />
    </div>
  );
}

BinaryQuestion.propTypes = binaryQuestionRequiredProps;

export default BinaryQuestion;
