import React, { PropTypes, Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../../actions/pollsActions';

class LikertForm extends Component {
  render() {
    const { question, value, onChange } = this.props;
    const labels = [
      "trifft zu",
      "trifft eher zu",
      "teils-teils",
      "trifft eher nicht zu",
      "trifft nicht zu"
    ];

    return (
      <div className="question">
        <h1>{question.text}</h1>
        <form>
          <ul className="likert">
          { labels.map((label, i) => (
              <li key={i}>
                <label>
                  <input
                    type="radio" name={label}
                    checked={value === i}
                    onChange={onChange(i)}
                  />
                  {label}
                </label>
              </li>
            )) }
          </ul>
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
)(LikertForm);
