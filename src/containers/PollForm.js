import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { clone, all, prop, filter, map, identity, none, any } from 'ramda';
import update from 'immutability-helper';

import ButtonRow from '../presentational/ButtonRow';
import QuestionForm from '../containers/QuestionForm';
import * as actions from '../actions/pollsActions';
import '../styles/quill.css';

class PollForm extends React.Component {

  static propTypes = {
    pollsActions: PropTypes.object.isRequired,
    measureId: PropTypes.string.isRequired,
    text: PropTypes.string,
    description: PropTypes.string,
    questions: PropTypes.array,
    poll: PropTypes.object
  };

  state = {
    text: this.props.text ? this.props.text : this.props.description,
    questions: this.props.questions ? clone(this.props.questions) : [],
    oldQuestions: this.props.questions ? clone(this.props.questions) : []
  };

  removeQuestion = (event, index) => {
    const temp = clone(this.state.questions);
    temp.splice(index, 1);
    this.setState({ questions: temp });
  };

  onPollTextChange = (value) => {
    this.setState({ text: value });
  };

  handleSubmit = () => {
    const { measureId, poll, pollsActions: { savePoll, editPoll } } = this.props;
    const { text, questions, oldQuestions } = this.state;

    if (poll) {
      editPoll(poll.id, text, questions, oldQuestions, measureId);
    } else {
      savePoll(text, questions, measureId);
    }
    browserHistory.goBack();
  };

  handleClose = () => {
    browserHistory.goBack();
    event.preventDefault();
  };

  changeQuestionText = (index) => {
    return event=> {
      const temp = clone(this.state.questions);
      temp[index].text = event.target.value;
      this.setState({ questions: temp});
    };
  };

  changeQuestionChoices = (index) => {
    return choices => {
      const temp = clone(this.state.questions);
      temp[index].choices = choices;
      this.setState({ questions: temp });
    };
  };

  newQuestion = type => () => {
    if (type === 'single choice') {
      this.setState( update(this.state, {
        questions: { $push: [{
          text: '',
          questionType: type,
          choices: ['', '', '']
        }]}
      }));
    } else {
      this.setState( update(this.state, {
        questions: { $push: [{
          text: '',
          questionType: type,
          choices: [] // TODO this is probably unncessary
        }]}
      }));
    }
  };

  render() {
    const { text, questions } = this.state;
    const oneQuestionHasNoText = any(question => !question.text)(questions);
    const oneAnswerHasNoText = any(q => q.questionType === "single choice" && any(choice => !choice, q.choices), questions);

    const body = questions.map((question, i) =>
      <div key={ i }>
        <QuestionForm
          changeQuestionText={ this.changeQuestionText(i) }
          changeQuestionChoices={this.changeQuestionChoices(i)} question={ question }
          index={ i } removeQuestion={ event => this.removeQuestion( event, i) }
        />
      </div>
    );

    return (
      <div>
        <br/>

        <label>Text der Umfrage:</label>

        <ReactQuill
          value={text}
          onChange={this.onPollTextChange}
          theme="snow"
        />

        <div className="button-row">
          <button className="button-primary" onClick={ this.newQuestion('binary') }>Neue binäre Frage</button>
          <button className="button-primary" onClick={ this.newQuestion('likert') }>Neue Likert Frage</button>
          <button className="button-primary" onClick={ this.newQuestion('single choice') }>Neue Single Choice Frage</button>
          <button className="button-primary" onClick={ this.newQuestion('freeform') }>Neue Freitext Frage</button>
        </div>

        { body }

        <ButtonRow onClose={this.handleClose} onSubmit={this.handleSubmit} disableSubmit={ !text || oneQuestionHasNoText || oneAnswerHasNoText }/>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    pollsActions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollForm);
