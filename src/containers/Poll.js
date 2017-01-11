import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/pollsActions';

class Poll extends Component {
  static propTypes = {
    pollsActions: PropTypes.object.isRequired,
    poll: PropTypes.object.isRequired
  };


  render() {
    console.log(this.props);
    return (
      <div className="poll">
        <p>{ this.props.poll.text }</p>
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
)(Poll);
