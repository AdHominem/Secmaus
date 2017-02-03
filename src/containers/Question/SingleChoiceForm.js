import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/pollsActions';

class SingleChoiceForm extends Component {
  constructor() {
    super();
    this.state = { answer: 2 };
  }

  render() {
    const { question } = this.props;
    const labels = [
      "trifft zu",
      "trifft eher zu",
      "teils-teils",
      "trifft eher nicht zu",
      "trifft nicht zu"
    ]

    return (
      <div className="question">
        <h1>{question.text}</h1>
        <form>
        { question.choices.map((choice, i) => (
            <label>
              <input
                type="radio" name={choice}
                checked={this.state.answer === i}
                onChange={event => this.setState({answer: i})}
              />
              {choice}
            </label>
          )) }
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleChoiceForm);
