import React, { PropTypes } from 'react';
import PollForm from '../components/PollForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/pollsActions';

class NewPoll extends React.Component {
  static propTypes = {
    pollsActions: PropTypes.object.isRequired,
    measureId: PropTypes.string.isRequired
  };

  render() {
    const { pollsActions, measureId } = this.props;
    return (
      <div className="new-poll">
        <h2>Umfrage hinzufügen</h2>
        <PollForm savePoll={ pollsActions.savePoll } measureId={ measureId } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    pollsActions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPoll);
