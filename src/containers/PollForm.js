import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { clone } from 'ramda';
import update from 'immutability-helper';

import * as actions from '../actions/pollsActions';
import '../styles/quill.css';
import QuestionForm from '../containers/QuestionForm';

class PollForm extends React.Component {

  static propTypes = {
    pollsActions: PropTypes.object.isRequired,
    measureId: PropTypes.string.isRequired,
    text: PropTypes.string,
    description: PropTypes.string,
    questions: PropTypes.array,
    poll: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.text ? props.text : props.description,
      questions: props.questions ? props.questions : []
    };
  }

  removeQuestion = (event, index) => {
    const temp = clone(this.state.questions);
    temp.splice(index, 1);
    this.setState({ questions: temp });
  };

  onPollTextChange = (value) => {
    this.setState({ text: value });
  };

  handleSubmit = () => {
    let { savePoll, editPoll } = this.props.pollsActions;
    let { measureId, poll } = this.props;
    let { text, questions } = this.state;

    if (poll) {
      editPoll(poll.id, text, questions, measureId);
    } else {
      savePoll(text, questions, measureId);
    }
    browserHistory.push(`/SIDATESecMaus/measure/${ measureId }`);
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
        choices: []
      }]}
    }));
  }
};

  render() {

    // TODO: Clean up
    const questions = this.state.questions.map((question, i) =>
      <div key={ i }>
        <QuestionForm
          changeQuestionText={ this.changeQuestionText(i) }
          changeQuestionChoices={this.changeQuestionChoices(i)} question={ question }
          index={ i } removeQuestion={ event => this.removeQuestion(event, i) }
        />
      </div>
    );

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
          <button className="button-primary" onClick={ this.newQuestion('binary') }>Neue binäre Frage</button>
          <button className="button-primary" onClick={ this.newQuestion('likert') }>Neue Likert Frage</button>
          <button className="button-primary" onClick={ this.newQuestion('single choice') }>Neue Single Choice Frage</button>
        </div>

        { questions }

        <div className="button-row">
          <button className="button-success" onClick={this.handleSubmit}>Speichern</button>
        </div>
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
