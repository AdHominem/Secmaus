import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/pollsActions';

class PollVote extends Component {

  static propTypes = {
    pollsActions: PropTypes.object.isRequired,
    poll: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = { choice: 0 };
  }

  render() {
    const { poll } = this.props;
    const { editPoll, deletePoll, answerPoll } = this.props.pollsActions;
    const { id, text, answers, choices, closed, measureId } = poll;

    const toggleClose = event => {
      editPoll(id, text, answers, choices, !closed, measureId);
      event.preventDefault();
    };

    const choseAnswer = id => event => {
      this.setState({
        choice: id
      });
    };

    // TODO: Filter by user
    const vote = event => {
      answerPoll(id, this.state.choice);
      event.preventDefault();
    };

    const body = poll.answers.map((answer, i) =>
      <div key={i} className="answer">
        <label>
          <input type="radio" onChange={ choseAnswer(i) } checked={ i === this.state.choice }/>
          { answer } { poll.choices.filter(choice => choice[1] == i).length }
        </label><br/>
      </div>
    );

    return (
      <div className="poll">
        <p>{ poll.text }</p>

        <form>
          { body }
        </form>

        <a onClick={ toggleClose }>{ closed ? "Öffnen" : "Schließen" }</a>

        <a onClick={ vote }>Abstimmen</a>

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
)(PollVote);
