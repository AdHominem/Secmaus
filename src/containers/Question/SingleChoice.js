import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/pollsActions';

class SingleChoiceQuestion extends Component {
  render() {
    const { question } = this.props;
    return (
      <div className="question">
        <h1>{question.text}</h1>
        <ul>
        {
          question.choices.map(choice =>
            <li>{choice}</li>
          )
        }
        </ul>
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
)(SingleChoiceQuestion);
