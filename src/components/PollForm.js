import React, { PropTypes } from 'react';
import ReactQuill from 'react-quill';
import '../styles/quill.css';
import { browserHistory } from 'react-router';
import * as actions from '../actions/pollsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { __, range, curry, clone } from 'ramda';
import QuestionForm from '../containers/QuestionForm';
import update from 'immutability-helper';

class PollForm extends React.Component {
  static propTypes = {
    savePoll: PropTypes.func.isRequired,
    measureId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.description,
      questions: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPollTextChange = this.onPollTextChange.bind(this);
    this.removeQuestion = this.removeQuestion.bind(this);
  }

  removeQuestion(event, index) {
    const temp = clone(this.state.questions);
    temp.splice(index, 1);
    this.setState({ questions: temp });
  }

  onPollTextChange(value) {
    this.setState({ text: value });
  }

  handleSubmit(event) {
    const { savePoll } = this.props;
    savePoll(this.state.text, this.state.questions, this.props.measureId);
    browserHistory.push(`/SIDATESecMaus/measure/${ this.props.measureId }`);
  }

  render() {
    const changeQuestionText = index => event => {
      const temp = clone(this.state.questions);
      temp[index].text = event.target.value;
      this.setState({ questions: temp });
    };

    const changeQuestionChoices = index => choices => {
      const temp = clone(this.state.questions);
      temp[index].choices = choices;
      this.setState({ questions: temp });
    };

    // TODO: Clean up
    const questions = this.state.questions.map((question, i) =>
      <div key={ i }>
        <QuestionForm
          changeQuestionText={ changeQuestionText(i) }
          changeQuestionChoices={changeQuestionChoices(i)} question={ question }
          index={ i } removeQuestion={ event => this.removeQuestion(event, i) }
        />
      </div>
    );

    const newQuestion = type => event => {
      if (type === 'single choice') {
        this.setState( update(this.state, {
          questions: { $push: [{
            text: '',
            questionType: type,
            choices: ['', '', '']
          }]}
        }))
      } else {
        this.setState( update(this.state, {
          questions: { $push: [{
            text: '',
            questionType: type,
            choices: []
          }]}
        }))
      }
    };


    return (
      <div>
        <br/>

        <label>Text der Umfrage:</label>

        <ReactQuill
          value={this.state.text}
          onChange={this.onPollTextChange}
          theme="snow"
        />

        <div className="button-row">
          <button className="btn btn-primary" onClick={ newQuestion('binary') }>Neue binäre Frage</button>
          <button className="btn btn-primary" onClick={ newQuestion('likert') }>Neue Likert Frage</button>
          <button className="btn btn-primary" onClick={ newQuestion('single choice') }>Neue Single Choice Frage</button>
        </div>

        { questions }

        <div className="button-row">
          <button className="btn btn-primary" onClick={this.handleSubmit}>Speichern</button>
        </div>
      </div>
    );
  }
}

export default PollForm;
