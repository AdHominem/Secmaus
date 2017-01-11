import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/pollsActions';
import React, { PropTypes, Component } from 'react';
import Poll from './Poll'

class Polls extends Component {
  static propTypes = {
    measureId: PropTypes.string.isRequired,
    polls: PropTypes.array.isRequired,
    pollsActions: PropTypes.object.isRequired
  };

  render() {
    const { polls, pollsActions } = this.props;
    const body = polls.map((poll, i) =>
      <Poll key={i} pollsActions={ pollsActions } poll={ poll }/>
    );

    return (
      <div>
        { body }
      </div>
    );
  }
}

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
