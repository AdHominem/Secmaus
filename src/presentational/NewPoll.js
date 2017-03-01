import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PollForm from '../containers/PollForm';
import * as actions from '../actions/pollsActions';

const newPollRequiredProps = {
  pollsActions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

function NewPoll(props) {
  const { pollsActions: { savePoll }, params: { measureId } } = props;

  return (
    <div className="new-poll">
      <h2>Umfrage hinzufügen</h2>
      <PollForm measureId={ measureId } />
    </div>
  );
}

NewPoll.propTypes = newPollRequiredProps;

function mapDispatchToProps(dispatch) {
  return {
    pollsActions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapDispatchToProps
)(NewPoll);
