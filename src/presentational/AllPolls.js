import React, { PropTypes } from 'react';
import {connect} from 'react-redux';

import Poll from '../containers/Poll';

const allPollsRequiredProps = {
  polls: PropTypes.array.isRequired
};

function AllPolls(props) {
    return (
      <div>
        <h2>Umfragen</h2>
        <div className="flex-boxes">
          {props.polls.map((poll,i) => <Poll key={i} poll={ poll } />)}
        </div>
      </div>
    );
}

AllPolls.propTypes = allPollsRequiredProps;

function mapStateToProps(state, ownProps) {
  return {
    polls: ownProps.polls || state.pollsReducer.polls,
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPolls);
