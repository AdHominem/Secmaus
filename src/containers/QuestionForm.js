import React, { PropTypes } from 'react';
import ReactQuill from 'react-quill';
import '../styles/quill.css';
import { browserHistory } from 'react-router';
import * as actions from '../actions/pollsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { __, range, curry, update } from 'ramda';

class QuestionForm extends React.Component {

  static propTypes = {
    question: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    changeQuestionText: PropTypes.func.isRequired,
    changeQuestionChoices: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.question.text,
      choices: props.question.choices,
      choicesCount: props.question.choices.length,
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  onChangeHandler(event) {
    const { changeQuestionChoices } = this.props;
    const count = +event.target.value;

    // .fill(null) is necessary because js arrays are broken
    const newChoices = (new Array(count)).fill(null).map((e, i) => this.state.choices[i] || "");
    this.setState({
      choicesCount: count,
      choices: newChoices,
    });

    changeQuestionChoices(newChoices)
  }

  onTextChange(event) {
    this.setState({
      question: {
        text: event.target.value
      }
    })
  }

  render() {
    const { changeQuestionText, removeQuestion, question: { questionType, choices }} = this.props;
    const translations = { 'binary' : 'binären', 'single choice' : 'Single Choice', 'likert' : 'Likert'};
    const { choicesCount } = this.state;

    const onAnswerChange = i => event => {
      console.log("answerChange", event.target.value);
      this.setState(
        { choices: update(i, event.target.value, this.state.choices) }
      );
      this.props.changeQuestionChoices(
        update(i, event.target.value, this.state.choices)
      );
    }

    return (
      <div className="question-form">
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

              { range(0, choicesCount).map(i =>
                  <div key={ i }>
                    <label className="answer-label">Antwort {i + 1}</label>
                    <input className="answer-input" onChange={ onAnswerChange(i) }/>
                  </div>)
              }
            </div>}


        <div className="button-row">
          <button className="btn btn-primary" onClick={ removeQuestion }>Frage löschen</button>
        </div>
      </div>
    );
  }
}

export default QuestionForm;
