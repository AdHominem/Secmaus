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
      answers: props.questions.map(q => 0),
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


  render() {
    const {
      isAdmin,
      poll,
      poll: {
        id, text, closed, measureId
      },
      pollsActions: { closePoll, deletePoll },
      questionsActions: { answerQuestion },
      questions
    } = this.props;

    const { answers, showResults } = this.state;

    const toggleShowResults = (event) => {
      this.setState({
        showResults: !this.state.showResults
      });
      event.preventDefault();
    };

    const selectAnswer = (index) => value => () => {
      this.setState({ answers: update(index, value, answers) });
    };

    const submitAnswers = () => {
      questions.forEach((question, i) => {
        answerQuestion(question.id, answers[i]);
      });
    };

    const toggleClose = (event) => {
      // TODO: The action takes a different number of params
      closePoll(id, !closed);
      console.log(closed ? "Poll " + id + " has been opened" : "Poll " + id + " has been closed");
      event.preventDefault();
    };

    const handleDeletePoll = event => {
      deletePoll(id, questions);
      event.preventDefault();
    };

    const onClick = event => {
      this.setState({ modalIsOpen: !this.state.modalIsOpen });
      event.preventDefault();
    };

    let alreadyAnswered = questions.length && any(answer => answer[0] === Parse.User.current().id, questions[0].answers);

    const selectQuestionForm = (question, i) =>
      <div key={i}>
        { alreadyAnswered = closed || alreadyAnswered || showResults }
        {question.questionType === "binary" ?
          alreadyAnswered ? <BinaryQuestion question={question}/>
            : <BinaryForm
                question={question}
                value={answers[i]}
                onChange={selectAnswer(i)}
              />
        : question.questionType === "likert" ?
          alreadyAnswered ? <LikertQuestion question={question}/>
            : <LikertForm
            question={question}
            value={answers[i]}
            onChange={selectAnswer(i)}
          />
        : question.questionType === "single choice" ?
          alreadyAnswered ? <SingleChoiceQuestion question={question}/>
            : <SingleChoiceForm
            question={question}
            value={answers[i]}
            onChange={selectAnswer(i)}
          />
        : <p>Fehler: Unbekannter Fragentyp {question.questionType}</p>}
      </div>;

    const unanswered = isEmpty(questions) || isEmpty(questions[0].answers);

    return (
      <div className="flex-box poll">
        <h1 className="flex-title" dangerouslySetInnerHTML={{__html: text}}/>
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

          { isAdmin && <div>
            <a onClick={toggleClose}>{ closed ? <FontAwesome name="lock" size="2x"/> : <FontAwesome name="unlock-alt" size="2x"/> }</a>
            &nbsp;&nbsp;
            { unanswered && <a onClick={onClick}><FontAwesome name="edit" size="2x"/>&nbsp;&nbsp;</a> }
            <a onClick={handleDeletePoll}><FontAwesome name="trash" size="2x"/></a>
            &nbsp;&nbsp;
            { !alreadyAnswered && <a onClick={ toggleShowResults }><FontAwesome name="bar-chart" size="2x"/></a> }
            &nbsp;&nbsp;
          </div> }

          { pipe(sortBy(prop('index')))(questions).map(selectQuestionForm) }

          { !alreadyAnswered && <button onClick={submitAnswers} >Antworten</button> }
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
