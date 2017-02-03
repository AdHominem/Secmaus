import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/pollsActions';

class SingleChoiceForm extends Component {
  render() {
    const { question, value, onChange } = this.props;

    return (
      <div className="question">
        <h1>{question.text}</h1>
        <form>
        { question.choices.map((choice, i) => (
            <label>
              <input
                type="radio" name={choice}
                checked={value === i}
                onChange={onChange(i)}
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
