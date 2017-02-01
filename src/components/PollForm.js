import React, { PropTypes } from 'react';
import ReactQuill from 'react-quill';
import '../styles/quill.css';
import { browserHistory } from 'react-router';
import * as actions from '../actions/pollsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { __, range, curry } from 'ramda';
import QuestionForm from '../containers/QuestionForm';

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
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onPollTextChange = this.onPollTextChange.bind(this);
    this.newBinaryQuestion = this.newBinaryQuestion.bind(this);
  }

  onChangeHandler(event) {
    this.setState({
      count: event.target.value,
      answers: this.state.answers.slice(0, event.target.value)
    });
  }

  onPollTextChange(value) {
    this.setState({
      text: value
    })
  }

  onAnswerChange(i, event) {
    let temp = this.state.answers;
    temp[i] = event.target.value;
    this.setState({
      answers:  temp
    })
  }

  removeQuestion(event) {

  }

  handleSubmit(event) {
    const { savePoll } = this.props;
    savePoll(this.state.text, this.state.answers, this.props.measureId);
    event.preventDefault();
    browserHistory.push(`/SIDATESecMaus/measure/${ this.props.measureId }`);
  }

  newBinaryQuestion(event) {
    event.preventDefault();
    let temp = this.state.questions;
    temp.push({
      text: '',
      questionType: 'binary',
      answers: []
    });
    this.setState({
      questions: temp
    })
  }

  render() {
    const body = range(1, 1 + this.state.count).map((number, i) =>
      <div key={i}>
        <label className="answer-label">Antwort {i + 1}</label>
        <input className="answer-input" onChange={ event => this.onAnswerChange(i, event) }/>
      </div>);

    const questions = this.state.questions.map((question, i) =>
      <div key={ i }>
        <QuestionForm question={ question } index={ i } />
      </div>
    );

    return (
      <form>
        <br/>

        <label>Text der Umfrage:</label>

        <ReactQuill
          value={this.state.text}
          onChange={this.onPollTextChange}
          theme="snow"
        />

        <button type="submit" className="btn btn-primary" onClick={ this.newBinaryQuestion }>Neue binäre Frage</button>

        { questions }

        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Umfrage hinzufügen</button>
      </form>
    );
  }
}

export default PollForm;
