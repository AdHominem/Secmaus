import React, { PropTypes, Component } from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Parse from "parse";
import { sortBy, pipe, prop, propEq, update, any, isEmpty } from "ramda";
import FontAwesome from 'react-fontawesome';
import Modal from 'react-modal';

import * as pollsActions from "../actions/pollsActions";
import * as questionsActions from "../actions/questionsActions";
import BinaryQuestion from "../presentational/Binary";
import LikertQuestion from "../presentational/Likert";
import SingleChoiceQuestion from "../presentational/SingleChoice";
import BinaryForm from "../presentational/BinaryForm";
import LikertForm from "../presentational/LikertForm";
import SingleChoiceForm from "../presentational/SingleChoiceForm";
import PollForm from './PollForm';

class Poll extends Component {

  static propTypes = {
    pollsActions: PropTypes.object.isRequired,
    poll: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    questionsActions: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      // default to 0 for all answers
      answers: props.questions.map(() => 0),
      modalIsOpen: false,
      showResults: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(props) {
    this.state = {
      // default to 0 for all answers
      answers: props.questions.map(() => 0)
    };
  }

  openModal() { this.setState({ modalIsOpen: true }); }
  afterOpenModal() { }
  closeModal() {this.setState({ modalIsOpen: false });}

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
    const { questionsActions: { answerQuestion } } = this.props;
    this.props.questions.forEach((question, i) => {
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

    return <div key={i}>
      { alreadyAnswered = closed || alreadyAnswered || showResults }
      {question.questionType === "binary" ?
        alreadyAnswered ? <BinaryQuestion question={question}/>
          : <BinaryForm
            question={question}
            value={answers[i]}
            onChange={this.selectAnswer(i)}
          />
        : question.questionType === "likert" ?
          alreadyAnswered ? <LikertQuestion question={question}/>
            : <LikertForm
              question={question}
              value={answers[i]}
              onChange={this.selectAnswer(i)}
            />
          : question.questionType === "single choice" ?
            alreadyAnswered ? <SingleChoiceQuestion question={question}/>
              : <SingleChoiceForm
                question={question}
                value={answers[i]}
                onChange={this.selectAnswer(i)}
              />
            : <p>Fehler: Unbekannter Fragentyp {question.questionType}</p>}
    </div>;
  };

  render() {
    const {
      isAdmin,
      poll,
      poll: {
        text, closed, measureId
      },
      questions
    } = this.props;

    const unanswered = isEmpty(questions) || isEmpty(questions[0].answers);
    let alreadyAnswered = questions.length && any(answer => answer[0] === Parse.User.current().id, questions[0].answers);

    const buttons = isAdmin && <span>
      <a onClick={this.toggleClose}>{ closed ? <FontAwesome name="lock"/> : <FontAwesome name="unlock-alt"/> }</a>
      &nbsp;&nbsp;
      { unanswered && <a onClick={this.onClick}><FontAwesome name="edit"/>&nbsp;&nbsp;</a> }
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

          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Umfrage editieren"
          >
            <PollForm
              pollsActions={pollsActions}
              measureId={measureId}
              poll={poll}
              questions={questions}
              text = {text}
            />
          </Modal>

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
