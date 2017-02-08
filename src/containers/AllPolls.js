import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import { uniq, update, any, clone, append } from 'ramda';
import Poll from '../containers/Poll'

class AllPolls extends Component {

  static propTypes = {
    polls: PropTypes.array.isRequired,
  };

  render() {
    const {polls} = this.props;
    return (
      <div>
        <h2>Umfragen</h2>
        <div className="flex-boxes">
          {polls.map((poll,i) => <Poll key={i} poll={ poll } />)}
        </div>
      </div>
    );
  }


}

function mapStateToProps(state, ownProps) {
  return {
    polls: state.pollsReducer.polls,
  };
}

function mapDispatchToProps(dispatch) {
  return { };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPolls);
