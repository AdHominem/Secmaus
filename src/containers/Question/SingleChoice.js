import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/pollsActions';

class SingleChoiceQuestion extends Component {
  render() {
    const { question, question: { choices, answers } } = this.props;

    const stats = choices.map((choice, i) => (
      [choice, answers.filter(answer => answer[1] === i).length]
    ));

    return (
      <div className="question">
        <h1>{question.text}</h1>
        <ul>
          { stats.map((stat, i) =>
              <li>{stat[0]}: {stat[1]}</li>
          )}
        </ul>
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
