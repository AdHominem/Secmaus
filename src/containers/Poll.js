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
    const { editPoll, deletePoll, answerPoll } = this.props.pollsActions;
    const { id, text, answers, choices, closed, measureId } = this.props.poll;

    const toggleClose = event => {

      editPoll(id, text, answers, choices, !closed, measureId);
      event.preventDefault();
      console.log(this.props);
    };

    const { poll } = this.props;
    const body = poll.answers.map((answer, i) =>
      <div key={i} className="answer"> { answer } { poll.choices.filter((choice) => choice[1] == answer).length }</div>
    );

    return (
      <div className="poll">
        <p>{ poll.text }</p>
        { body }
        <a onClick={ toggleClose }>{ closed ? "Öffnen" : "Schließen" }</a>
       {/* <a onClick={ }>Abstimmen</a>
        <a onClick={ }>Bearbeiten</a>
        <a onClick={ }>Löschen</a>*/}
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
