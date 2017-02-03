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
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onPollTextChange = this.onPollTextChange.bind(this);
    this.changeQuestionText = this.changeQuestionText.bind(this);
  }

  onChangeHandler(event) {
    this.setState({
      count: event.target.value,
      answers: this.state.answers.slice(0, event.target.value)
    });
  }

  onPollTextChange(value) {
    this.setState({ text: value });
  }

  changeQuestionText(event, index) {
    const temp = clone(this.state.questions);
    temp[index].text = event.target.value;
    this.setState({ questions: temp });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { savePoll } = this.props;
    savePoll(this.state.text, this.state.questions, this.props.measureId);

    browserHistory.push(`/SIDATESecMaus/measure/${ this.props.measureId }`);
  }

  render() {
    const questions = this.state.questions.map((question, i) =>
      <div key={ i }>
        <QuestionForm changeQuestionText={ event => this.changeQuestionText(event, i) } question={ question } index={ i } />
      </div>
    );

    const newQuestion = type => event => {
      event.preventDefault();
      this.setState( update(this.state, {
        questions: { $push: [{
          text: '',
          questionType: type,
          answers: []
        }]}
      }))
    };

    return (
      <form>
        <br/>

        <label>Text der Umfrage:</label>

        <ReactQuill
          value={this.state.text}
          onChange={this.onPollTextChange}
          theme="snow"
        />

        <div className="button-row">
          <button type="submit" className="btn btn-primary" onClick={ newQuestion('binary') }>Neue binäre Frage</button>
          <button type="submit" className="btn btn-primary" onClick={ newQuestion('likert') }>Neue Likert Frage</button>
          <button type="submit" className="btn btn-primary" onClick={ newQuestion('single choice') }>Neue Single Choice Frage</button>
          <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Umfrage hinzufügen</button>
        </div>

        { questions }
      </form>
    );
  }
}

export default PollForm;
