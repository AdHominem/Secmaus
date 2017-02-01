import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/pollsActions';
import PollVote from './PollVote';

class Poll extends Component {

  static propTypes = {
    pollsActions: PropTypes.object.isRequired,
    poll: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = { choice: 0 };
  }

  render() {
    const { isAdmin, poll } = this.props;
    const { editPoll, deletePoll, answerPoll } = this.props.pollsActions;
    const { id, text, answers, choices, closed, measureId } = poll;

    const toggleClose = event => {
      editPoll(id, text, answers, choices, !closed, measureId);
      event.preventDefault();
    };


    return (
      <div className="poll">
        <p>{ poll.text }</p>

        <a onClick={ toggleClose }>{ closed ? "Öffnen" : "Schließen" }</a>
        <a>Bearbeiten</a>
        <a>Löschen</a>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pollsActions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Poll);
