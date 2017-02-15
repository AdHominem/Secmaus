import React, { PropTypes, Component } from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as pollsActions from "../actions/pollsActions";
import * as questionsActions from "../actions/questionsActions";
import Parse from "parse";
import BinaryQuestion from "./Question/Binary";
import LikertQuestion from "./Question/Likert";
import SingleChoiceQuestion from "./Question/SingleChoice";
import BinaryForm from "./Question/BinaryForm";
import LikertForm from "../components/Question/LikertForm";
import SingleChoiceForm from "./Question/SingleChoiceForm";
import { sortBy, pipe, sort, prop, propEq, map, update, any, clone } from "ramda";
import FontAwesome from 'react-fontawesome';
import Modal from 'react-modal';
import PollForm from '../components/PollForm';


class Poll extends Component {

  static propTypes = {
    pollsActions: PropTypes.object.isRequired,
    poll: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      // default to 0 for all answers
      answers: props.questions.map(q => 0)
    };
  }

  componentWillReceiveProps(props) {
    this.state = {
      // default to 0 for all answers
      answers: props.questions.map(q => 0)
    };
  }

  render() {
    const {
      isAdmin,
      poll: {
        id, text, closed, measureId
      },
      pollsActions: { editPoll, deletePoll, answerPoll },
      questionsActions: { answerQuestion },
      questions
    } = this.props;

    const { answers } = this.state;

    const selectAnswer = index => value => event => {
      this.setState({ answers: update(index, value, answers) });
    };

    const submitAnswers = event => {
      questions.forEach((question, i) => {
        answerQuestion(question.id, answers[i]);
      });
    };

    const toggleClose = event => {
      // TODO: The action takes a different number of params
      editPoll(id, text, !closed, measureId);
      console.log(closed ? "Poll " + id + " has been opened" : "Poll " + id + " has been closed");
      event.preventDefault();
    };

    const handleDeletePoll = event => {
      deletePoll(id, questions);
      event.preventDefault();
    };

    let alreadyAnswered = questions.length > 0 && any(answer => (answer[0] === Parse.User.current().id), questions[0].answers);

    const selectQuestionForm = (question, i) =>
      <div key={i}>
        { alreadyAnswered = closed || alreadyAnswered }
        {(question.questionType === "binary") ?
          alreadyAnswered ? <BinaryQuestion question={question}/>
            : <BinaryForm
                question={question}
                value={answers[i]}
                onChange={selectAnswer(i)}
              />
        : (question.questionType === "likert") ?
          alreadyAnswered ? <LikertQuestion question={question}/>
            : <LikertForm
            question={question}
            value={answers[i]}
            onChange={selectAnswer(i)}
          />
        : (question.questionType === "single choice") ?
          alreadyAnswered ? <SingleChoiceQuestion question={question}/>
            : <SingleChoiceForm
            question={question}
            value={answers[i]}
            onChange={selectAnswer(i)}
          />
        : <p>Fehler: Unbekannter Fragentyp {question.questionType}</p>}
      </div>;

    return (
      <div className="flex-box poll">
        <h1 className="flex-title" dangerouslySetInnerHTML={{__html: text}}/>
        <div className="flex-content">
          <a onClick={ toggleClose }>{ closed ? <FontAwesome name="lock" size="2x"/> : <FontAwesome name="unlock-alt" size="2x"/> }</a>
          &nbsp;&nbsp;

          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Umfrage editieren"
          >
            <PollForm savePoll="" measureId=""/>
          </Modal>

          <a><FontAwesome name="edit" size="2x"/></a>
          &nbsp;&nbsp;
          <a onClick={ handleDeletePoll }><FontAwesome name="trash" size="2x"/></a>
          &nbsp;&nbsp;
          { pipe(sortBy(prop('index')))(questions).map(selectQuestionForm) }
          { !alreadyAnswered && <input type="submit" onClick={submitAnswers} /> }
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
