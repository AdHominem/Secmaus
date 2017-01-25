import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/pollsActions';

class Poll extends Component {

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
      console.log(id);

      this.setState({
        choice: id
      });
    };

    // TODO: Filter by user
    const vote = event => {
      answerPoll(id, this.state.choice)
    };

    const body = poll.answers.map((answer, i) =>
      <div key={i} className="answer">
        <input checked={ i === this.state.choice } type="radio" name="answer-choice" id={i} onClick={ choseAnswer(i) } value={ true }/>
        <label htmlFor={i}> { answer } { poll.choices.filter(choice => choice[1] == i).length } </label><br/>
      </div>
    );


    return (
      <div className="poll">
        <p>{ poll.text }</p>

        <fieldset>
          { body }
        </fieldset>

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
)(Poll);
