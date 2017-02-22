import React, { PropTypes, Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { map, nth, compose, pipe, equals, filter } from 'ramda';
import { likertColors } from '../constants/colors';
import { count } from '../utils/count';

const LikertQuestion = ({ question, question: { choices, answers } }) => {
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

export default LikertQuestion;
