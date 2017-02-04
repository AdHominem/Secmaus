import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/pollsActions';
import { Pie } from 'react-chartjs-2';
import { map, nth } from 'ramda';
import { singleChoiceColors } from '../../constants/colors';

class SingleChoiceQuestion extends Component {
  render() {
    const { question, question: { choices, answers } } = this.props;

    const stats = choices.map((choice, i) => (
      [choice, answers.filter(answer => answer[1] === i).length]
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
)(SingleChoiceQuestion);
