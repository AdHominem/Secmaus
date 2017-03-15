import React, { PropTypes } from 'react';
import { range, update } from 'ramda';

import '../styles/quill.css';

class QuestionForm extends React.Component {

  static propTypes = {
    question: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    changeQuestionText: PropTypes.func.isRequired,
    changeQuestionChoices: PropTypes.func.isRequired,
    removeQuestion: PropTypes.func.isRequired
  };

  state = {
    text: this.props.question.text,
    choices: this.props.question.choices,
  };

  onChangeHandler = (event) => {
    const { changeQuestionChoices } = this.props;
    const count = +event.target.value;

    const newChoices = (new Array(count)).fill().map((e, i) => this.state.choices[i] || "");
    this.setState({
      choices: newChoices,
    });

    changeQuestionChoices(newChoices);
  };

  onTextChange = (event) => {
    this.setState({
      question: {
        text: event.target.value
      }
    });
  };

  onChoicesChange = (i) => {
    return event => {
      this.setState(
        { choices: update(i, event.target.value, this.state.choices) }
      );
      this.props.changeQuestionChoices(
        update(i, event.target.value, this.state.choices)
      );
    };
  };

  render() {
    const { changeQuestionText, removeQuestion, question: { questionType, choices, text }} = this.props;
    const translations = { 'binary' : 'binären', 'single choice' : 'Single Choice', 'likert' : 'Likert'};

    return (
      <div className="question-form">
        <br/>

        <label>Text der { translations[questionType] } Frage:</label>
        <input type="text" value={ text } onChange={ changeQuestionText }/>

          { questionType == 'single choice' &&
            <div className="answers">
              <select defaultValue={3} name="answer_dropdown" size="1" onChange={ this.onChangeHandler }>
                { range(2, 11).map(i => <option key={i}>{i}</option>) }
              </select>

              { choices.map((e, i) =>
                  <div key={ i }>
                    <label className="answer-label">Antwort {i + 1}</label>
                    <input className="answer-input" onChange={ this.onChoicesChange(i) } value={ e }/>
                  </div>)
              }
            </div>}
        <div className="button-row">
          <button className="button-danger" onClick={ removeQuestion }>Frage löschen</button>
        </div>
      </div>
    );
  }
}

export default QuestionForm;
