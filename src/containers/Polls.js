import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/pollsActions';
import React, { PropTypes } from 'react';
import Poll from './Poll'
import { Link } from 'react-router';


const Polls = props => {
  const { polls, pollsActions, measureId } = props;

  const body = polls.filter(poll => (measureId ? poll.measure.id == measureId : poll))
                    .map((poll, i) => <Poll key={i} pollsActions={ pollsActions } poll={ poll }/>
  );

  return (
    <div className="polls">
      <Link className="btn btn-primary" to={'/polls/new'}>Neue Umfrage</Link>
      { body }
    </div>
  );
};

Polls.propTypes = {
  measureId: PropTypes.string,
  polls: PropTypes.array.isRequired,
  pollsActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    polls: state.pollsReducer.polls
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
)(Polls);
