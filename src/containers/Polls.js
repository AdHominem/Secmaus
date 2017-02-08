import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/pollsActions';
import React, { PropTypes } from 'react';
import Poll from './Poll'
import { Link } from 'react-router';
import { propEq } from 'ramda';

class Polls extends React.Component {

  static propTypes = {
    measureId: PropTypes.string.isRequired,
    polls: PropTypes.array.isRequired,
    pollsActions: PropTypes.object.isRequired
  };

  render() {
    const { polls, showButtons, measureId } = this.props;

    return (
      <div className="polls">
        {
          showButtons &&  <Link
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
}

function mapStateToProps(state, ownProps) {
  return {
    polls: state.pollsReducer.polls.filter(propEq("measureId", ownProps.measureId)),
    showButtons: ownProps.showButtons
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
