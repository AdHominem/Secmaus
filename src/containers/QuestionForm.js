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
    index: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.question.text,
      answers: [],
      count: 3
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  onChangeHandler(event) {
    this.setState({
      count: event.target.value,
      answers: this.state.answers.slice(0, event.target.value)
    });
  }

  onTextChange(event) {
    this.setState({
      text: event.target.value
    })
  }

  onAnswerChange(i, event) {
    let temp = this.state.answers;
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
    const { removeQuestion, question: { questionType } } = this.props;

    const body = (questionType == 'binary') ? <div>Binäre Frage</div>
      : (questionType == 'likert') ? <div>LIKERT</div>
      : (questionType == 'single choice') ?
          <div>
            SINGLE CHOICE

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

            const answers = range(1, 1 + +this.state.count).map((number, i) =>
            <div key={i}>
              <label className="answer-label">Antwort {i + 1}</label>
              <input className="answer-input" onChange={ event => this.onAnswerChange(i, event) }/>
            </div>);

            { answers }
          </div>
      : <div>DUMMY</div>;

    return (
      <form className="question-form">
        <br/>

        <label>Text der Frage:</label>

        <input type="text" value={ this.state.text } onChange={ this.onTextChange }/>

        <div className="answers-selector">
          { body }
        </div>

        <div className="button-row--left">
          <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Frage hinzufügen</button>
          <button type="submit" className="btn btn-primary" onClick={ removeQuestion }>Frage löschen</button>
        </div>
      </form>
    );
  }
}

export default QuestionForm;
