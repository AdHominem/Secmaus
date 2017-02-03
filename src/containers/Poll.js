import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/pollsActions';
import PollVote from './PollVote';
import Question from './Question';

class Poll extends Component {

  static propTypes = {
    pollsActions: PropTypes.object.isRequired,
    poll: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = { choice: 0 };
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

    const toggleClose = event => {
      // TODO: The action takes a different number of params
      editPoll(id, text, answers, choices, !closed, measureId);
      event.preventDefault();
    };

    console.log(questions);

    return (
      <div className="flex-box poll">
        <h1
          className="flex-title"
          dangerouslySetInnerHTML={{__html: text}}
        />
        <a onClick={ toggleClose }>{ closed ? "Öffnen" : "Schließen" }</a>
        <a>Bearbeiten</a>
        <a>Löschen</a>

        {
          questions.map(question =>
            <Question question={question} />
          )
        }
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
