import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/pollsActions';
import React, { PropTypes } from 'react';
import Poll from './Poll'
import { Link } from 'react-router';


class Polls extends React.Component {

  static propTypes = {
    measureId: PropTypes.string.isRequired,
    polls: PropTypes.array.isRequired,
    pollsActions: PropTypes.object.isRequired
  };

  render() {
    const { polls, pollsActions, measureId } = this.props;
    const body = polls.filter(poll => (measureId ? poll.measureId == measureId : poll))
                      .map((poll, i) => <Poll key={i} pollsActions={ pollsActions } poll={ poll }/>
    );

    return (
      <div className="polls">
        <Link className="btn btn-primary" to={`/SIDATESecMaus/poll/${ measureId }/new`}>Neue Umfrage</Link>
        { body }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    polls: state.pollsReducer.questions
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
