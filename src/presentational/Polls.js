import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/pollsActions';
import React, { PropTypes } from 'react';
import Poll from '../containers/Poll'
import { Link } from 'react-router';
import { propEq } from 'ramda';

const pollRequiredProps = {
  measureId: PropTypes.string.isRequired,
  polls: PropTypes.array.isRequired,
  pollsActions: PropTypes.object.isRequired,
  showButtons: PropTypes.bool.isRequired
};

function Polls({ polls, showButtons, measureId, isAdmin }) {
  return (
    <div className="polls">
      {
        showButtons && isAdmin && <Link
          className="btn btn-primary"
          to={`/SIDATESecMaus/measure/${ measureId }/polls/new`}
        >
          Neue Umfrage
        </Link>
      }
      <div className="flex-boxes">
        {polls.map((poll, i) => (
            <Poll key={i} poll={ poll } />
        ))}
      </div>
    </div>
  );
}

Polls.propTypes = pollRequiredProps;

function mapStateToProps(state, ownProps) {
  return {
    isAdmin: state.userReducer.isAdmin,
    polls: state.pollsReducer.polls.filter(propEq("measureId", ownProps.measureId))
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
