import React, { PropTypes, Component } from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Parse from "parse";
import Alert from "react-s-alert";
import { sortBy, pipe, prop, propEq, update, any, ifElse, always } from "ramda";

import IconButtonRow from '../presentational/IconButtonRow';
import questionTypes from "../constants/questionTypes";
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
    answers: this.props.questions.map(ifElse(propEq('questionType', 'freeform'), always(""), always(0))),
    showResults: false
  };

  componentWillReceiveProps() {
    this.state = {
      answers: this.props.questions.map(ifElse(propEq('questionType', 'freeform'), always(""), always(0))),
    };
  }

  toggleShowResults = (event) => {
    this.setState({
      showResults: !this.state.showResults
    });
    event.preventDefault();
  };

  selectAnswer = (index) => (value) => () => {
    console.log("selectAnswers");
    this.setState({ answers: update(index, value, this.state.answers) });
  };

  submitAnswers = () => {
    const { questions, questionsActions: { answerQuestion } } = this.props;
    questions.forEach((question, i) => {
      answerQuestion(question.id, this.state.answers[i]);
    });
    Alert.success("Antworten wurde erfolgreich gespeichert");
  };

  toggleClose = (event) => {
    const { poll: { id, closed }, pollsActions: { closePoll } } = this.props;
    closePoll(id, !closed);
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

    const component = questionTypes[question.questionType];
    if(!component) {
      return <p>Ungültiger Fragetyp</p>;
    }

    if (closed || alreadyAnswered || showResults) {
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
    console.log("Poll rendered");
    console.log(this.state);

    const {
      isAdmin,
      poll: { id, text, closed, measureId },
      questions
    } = this.props;

    let alreadyAnswered = questions.length > 0 &&
      any(answer => answer[0] === Parse.User.current().id, questions[0].answers);

    let buttons = [];
    buttons.push({icon: closed ? "lock" : "unlock-alt", onClick: this.toggleClose});
    if (!alreadyAnswered) {
      buttons.push({icon: "edit", link: `/SIDATESecMaus/measure/${ measureId }/polls/${ id }/edit`});
      buttons.push({icon: "bar-chart", onClick: this.toggleShowResults});
    }
    buttons.push({icon: "trash", onClick: this.handleDeletePoll});

    return (
      <div className="flex-box poll">
        <h1 className="flex-title">
          <span className="inline" dangerouslySetInnerHTML={{__html: text}}/>
          { isAdmin && <IconButtonRow buttons={buttons}/> }
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
    isAdmin: state.isAdmin,
    questions: state.questions.filter(propEq("pollId", ownProps.poll.id))
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
