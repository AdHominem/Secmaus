import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/pollsActions';
import PollVote from './PollVote';
import BinaryQuestion from './Question/Binary';
import LikertQuestion from './Question/Likert';
import SingleChoiceQuestion from './Question/SingleChoice';
import BinaryForm from './Question/BinaryForm';
import LikertForm from './Question/LikertForm';
import SingleChoiceForm from './Question/SingleChoiceForm';
import { any, clone } from 'ramda';

class Poll extends Component {

  static propTypes = {
    pollsActions: PropTypes.object.isRequired,
    poll: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      // default to 0 for all answers
      answers: props.questions.map(q => 0)
    };
  }

  render() {
    const {
      isAdmin,
      poll: {
        id, text, closed, measureId
      },
      pollsActions: { editPoll, deletePoll, answerPoll },
      questions
    } = this.props

    const { answers } = this.state

    const selectAnswer = index => value => event => {
      const temp = clone(answers);
      temp[index] = value;
      this.setState({ answers: temp });
    }

    const toggleClose = event => {
      // TODO: The action takes a different number of params
      editPoll(id, text, answers, choices, !closed, measureId);
      event.preventDefault();
    };

    console.log(questions);
    const alreadyAnswered = any(answer => (answer[0] === Parse.User.current().id), questions[0].answers);

    return (
      <div className="flex-box poll">
        <h1
          className="flex-title"
          dangerouslySetInnerHTML={{__html: text}}
        />
        <div className="flex-content">
          <a onClick={ toggleClose }>{ closed ? "Öffnen" : "Schließen" }</a>
          <a>Bearbeiten</a>
          <a>Löschen</a>
          {
            questions.map((question, i) => {
                switch (question.questionType) {
                  case "binary":
                    return alreadyAnswered ? 
                      <BinaryQuestion question={question} /> :
                      <BinaryForm
                        question={question}
                        value={answers[i]}
                        onChange={selectAnswer(i)}
                      />;
                  case "likert":
                    return alreadyAnswered ? 
                      <LikertQuestion question={question} /> :
                      <LikertForm
                        question={question}
                        value={answers[i]}
                        onChange={selectAnswer(i)}
                      />;
                  case "single choice":
                    return alreadyAnswered ? 
                      <SingleChoiceQuestion question={question} /> :
                      <SingleChoiceForm
                        question={question}
                        value={answers[i]}
                        onChange={selectAnswer(i)}
                      />;
                  default:
                    return <p>Fehler: Unbekannter Fragentyp {question.questionType}</p>;
                }
            })
          }
    </div>
      </div>
      );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isAdmin: state.userReducer.isAdmin,
    questions: state.questionsReducer.questions.filter(
        question => question.pollId === ownProps.poll.id
        )
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pollsActions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Poll);
