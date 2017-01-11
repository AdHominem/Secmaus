import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/pollsActions';
import { sum } from 'ramda';

class Poll extends Component {
  static propTypes = {
    pollsActions: PropTypes.object.isRequired,
    poll: PropTypes.object.isRequired
  };

  render() {
    const { poll } = this.props;
    const body = poll.answers.map((answer, i) =>
      <div key={i} className="answer"> { answer } { poll.choices.filter((choice) => choice[1] == answer).length }</div>
    );

    console.log(this.props);
    return (
      <div className="poll">
        <p>{ poll.text }</p>
        { body }
      </div>
    );
  }
}

function mapStateToProps() {
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
