import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/pollsActions';

class BinaryForm extends Component {
  constructor() {
    super();
    this.state = { answer: 0 };
  }

  render() {
    const { question } = this.props;
    return (
      <div className="question">
        <h1>{question.text}</h1>
        <form>
          <div className="button-group">
            <label>
              <input
                type="radio" name="yes"
                checked={this.state.answer === 0}
                onChange={event => this.setState({answer: 0})}
              />
              <span className="button-group-item button-group-item--yes">Ja</span>
            </label>
            <label>
              <input
                type="radio"
                name="no" checked={this.state.answer === 1}
                onChange={event => this.setState({answer: 1})}
              />
              <span className="button-group-item button-group-item--no">Nein</span>
            </label>
          </div>
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
)(BinaryForm);
