import React, { PropTypes, Component } from "react";
import { Link } from 'react-router';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Parse from "parse";
import { sortBy, pipe, prop, propEq, update, any, isEmpty } from "ramda";
import FontAwesome from "react-fontawesome";
import Modal from "react-modal";

import questionTypes from "../constants/questionTypes";
import PollForm from "./PollForm";
import * as pollsActions from "../actions/pollsActions";
import * as questionsActions from "../actions/questionsActions";

class Poll extends Component {

  static propTypes = {
    pollsActions: PropTypes.object.isRequired,
    poll: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    questionsActions: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired
  };

  state = {
    // default to 0 for all answers
    answers: this.props.questions.map(() => 0),
    showResults: false
  };

  componentWillReceiveProps(props) {
    this.state = {
      // default to 0 for all answers
      answers: props.questions.map(() => 0)
    };
  }

  toggleShowResults = (event) => {
    this.setState({
      showResults: !this.state.showResults
    });
    event.preventDefault();
  };

  selectAnswer = (index) => (value) => () => {
    this.setState({ answers: update(index, value, this.state.answers) });
  };

  submitAnswers = () => {
    const { questions, questionsActions: { answerQuestion } } = this.props;
    questions.forEach((question, i) => {
      answerQuestion(question.id, this.state.answers[i]);
    });
  };

  toggleClose = (event) => {
    const { poll: { id, closed }, pollsActions: { closePoll } } = this.props;
    // TODO: The action takes a different number of params
    closePoll(id, !closed);
    console.log(closed ? "Poll " + id + " has been opened" : "Poll " + id + " has been closed");
    event.preventDefault();
  };

  handleDeletePoll = event => {
    const { poll: { id }, questions, pollsActions: { deletePoll } } = this.props;
    deletePoll(id, questions);
    event.preventDefault();
  };

  onClick = event => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
    event.preventDefault();
  };

  selectQuestionForm = (question, i) => {
    const { poll: { closed }, questions } = this.props;
    const { answers, showResults } = this.state;

    let alreadyAnswered = questions.length && any(answer => answer[0] === Parse.User.current().id, questions[0].answers);
    alreadyAnswered = closed || alreadyAnswered || showResults;

    const component = questionTypes[question.questionType] ||
      {result: <p>Ungültiger Fragetyp</p>, form: <p>Ungültiger Fragetyp</p>};

    if (alreadyAnswered) {
      return React.createElement(component.results, {
        key: i,
        question: question
      });
    } else {
      return React.createElement(component.form, {
        key: i,
        question: question,
        value: answers[i],
        onChange: this.selectAnswer(i)
      });
    }
  };

  render() {
    const {
      isAdmin,
      poll,
      poll: {
        id, text, closed, measureId
      },
      questions
    } = this.props;

    const unanswered = isEmpty(questions) || isEmpty(questions[0].answers);
    let alreadyAnswered = questions.length && any(answer => answer[0] === Parse.User.current().id, questions[0].answers);

    const buttons = isAdmin && <span>
      <a onClick={this.toggleClose}>{ closed ? <FontAwesome name="lock"/> : <FontAwesome name="unlock-alt"/> }</a>
      &nbsp;&nbsp;
      { unanswered &&
        <Link to={`/SIDATESecMaus/measure/${ measureId }/polls/${ id }/edit`} >
          <FontAwesome name="edit"/>
        </Link>
      }
      { !alreadyAnswered && <a onClick={ this.toggleShowResults }><FontAwesome name="bar-chart"/></a> }
      &nbsp;&nbsp;
      <a onClick={this.handleDeletePoll}><FontAwesome name="trash"/></a>
      &nbsp;&nbsp;
    </span>;

    return (
      <div className="flex-box poll">
        <h1 className="flex-title">
          <span className="inline" dangerouslySetInnerHTML={{__html: text}}/> &nbsp; {buttons}
        </h1>
        <div className="flex-content">
          { pipe(sortBy(prop('index')))(questions).map(this.selectQuestionForm) }
          { !alreadyAnswered && <button onClick={this.submitAnswers} >Antworten</button> }
        </div>
      </div>
      );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isAdmin: state.userReducer.isAdmin,
    questions: state.questionsReducer.questions.filter(propEq("pollId", ownProps.poll.id))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pollsActions: bindActionCreators(pollsActions, dispatch),
    questionsActions: bindActionCreators(questionsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Poll);
