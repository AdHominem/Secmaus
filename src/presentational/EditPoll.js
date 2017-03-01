import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { find, propEq } from 'ramda';

import PollForm from '../containers/PollForm';
import * as actions from '../actions/pollsActions';

const editPollRequiredProps = {
  pollsActions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

function EditPoll(props) {
  const { pollsActions, measureId, poll, questions, text } = props;
  return (
    <div className="new-poll">
      <h2>Umfrage hinzufügen</h2>
      <PollForm
        pollsActions={pollsActions}
        measureId={measureId}
        poll={poll}
        questions={questions}
        text = {text}
      />
    </div>
  );
}

EditPoll.propTypes = editPollRequiredProps;

function mapStateToProps(state, ownProps) {
  const measureId = ownProps.params.measureId;
  const pollId = ownProps.params.pollId;
  const poll = find(propEq('id', pollId), state.pollsReducer.polls);

  return {
    measureId, poll,
    questions: state.questionsReducer.questions.filter(propEq("pollId", pollId)),
    text: poll.text
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
)(EditPoll);
