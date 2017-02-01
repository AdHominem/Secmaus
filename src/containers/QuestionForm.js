import React, { PropTypes } from 'react';
import ReactQuill from 'react-quill';
import '../styles/quill.css';
import { browserHistory } from 'react-router';
import * as actions from '../actions/pollsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { __, range, curry } from 'ramda';

class QuestionForm extends React.Component {

  static propTypes = {
    question: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    changeQuestionText: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.question.text,
      answers: props.question.answers,
      answersCount: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  onChangeHandler(event) {
    this.setState({
      answersCount: +event.target.value,
      answers: this.props.question.answers.slice(0, event.target.value)
    });
  }

  onTextChange(event) {
    this.setState({
      question: {
        text: event.target.value
      }
    })
  }

  onAnswerChange(i, event) {
    let temp = this.props.question.answers;
    temp[i] = event.target.value;
    this.setState({
      answers:  temp
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    browserHistory.push(`/SIDATESecMaus/measure/${ this.props.measureId }`);
  }

  render() {
    const { changeQuestionText, removeQuestion, question: { questionType, answers }} = this.props;
    const translations = { 'binary' : 'binären', 'single choice' : 'Single Choice', 'likert' : 'Likert'};
    const { answersCount } = this.state;

    return (
      <form className="question-form">
        <br/>

        <label>Text der { translations[questionType] } Frage:</label>

        <input type="text" value={ this.props.text } onChange={ changeQuestionText }/>

          { questionType == 'single choice' &&
            <div className="answers">
              <select defaultValue={3} name="answer_dropdown" size="1" onChange={ this.onChangeHandler }>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>

              { range(1, 1 + answersCount).map(i =>
                  <div key={ i }>
                    <label className="answer-label">Antwort {i + 1}</label>
                    <input className="answer-input" onChange={ event => this.onAnswerChange(i, event) }/>
                  </div>)
              }
            </div>}


        <div className="button-row">
          <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Frage hinzufügen</button>
          <button type="submit" className="btn btn-primary" onClick={ removeQuestion }>Frage löschen</button>
        </div>
      </form>
    );
  }
}

export default QuestionForm;
