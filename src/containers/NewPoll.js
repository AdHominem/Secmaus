import React, { PropTypes } from 'react';
import PollForm from '../components/PollForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/pollsActions';

class NewPoll extends React.Component {
  static propTypes = {
    pollActions: PropTypes.object.isRequired
  };

  render() {
    const { pollActions } = this.props;
    return (
      <div className="poll--form">
        <h2>Umfrage hinzufügen</h2>
        <PollForm savePoll={pollActions} />
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    measureActions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPoll);
