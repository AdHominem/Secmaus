import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import Parse from 'parse';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/pollsActions';
import BinaryQuestion from './Question/Binary';
import LikertQuestion from './Question/Likert';
import SingleChoiceQuestion from './Question/SingleChoice';
import BinaryForm from './Question/BinaryForm';
import LikertForm from './Question/LikertForm';
import SingleChoiceForm from './Question/SingleChoiceForm';
import { any } from 'ramda';

class Question extends Component {
  render() {
    const { question } = this.props;
    const alreadyAnswered = any(answer => (answer[0] === Parse.User.current().id), question.answers);

    switch (question.questionType) {
      case "binary":
        return alreadyAnswered ? 
               <BinaryQuestion question={question} /> :
               <BinaryForm question={question} />;
      case "likert":
        return alreadyAnswered ? 
               <LikertQuestion question={question} /> :
               <LikertForm question={question} />;
      case "single choice":
        return alreadyAnswered ? 
               <SingleChoiceQuestion question={question} /> :
               <SingleChoiceForm question={question} />;
      default:
        return <p>Fehler: Unbekannter Fragentyp {question.questionType}</p>;
    }
  }
}

function mapStateToProps(state, ownProps) {
  return { };
}

function mapDispatchToProps(dispatch) {
  return { };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);
