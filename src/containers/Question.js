import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/pollsActions';
import BinaryQuestion from './BinaryQuestion';
import LikertQuestion from './LikertQuestion';
import SingleChoiceQuestion from './SingleChoiceQuestion';

class Question extends Component {
  render() {
    const { question } = this.props;
    switch (question.questionType) {
      case "binary":
        return <BinaryQuestion question={question} />;
      case "likert":
        return <LikertQuestion question={question} />;
      case "single choice":
        return <SingleChoiceQuestion question={question} />;
      default:
        return <p>Fehler: Unbekannter Fragentyp {question.questionType}</p>;
    }
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pollsActions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);
