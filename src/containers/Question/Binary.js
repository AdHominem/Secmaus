import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/pollsActions';
import { Pie } from 'react-chartjs-2';
import { map, nth } from 'ramda';
import { binaryColors } from '../../constants/colors';

class BinaryQuestion extends Component {
  render() {
    const { question, question: { choices, answers } } = this.props;

    const stats = ["Ja", "Nein"].map((choice, i) => (
      [choice, answers.filter(answer => answer[1] === i).length]
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
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BinaryQuestion);
