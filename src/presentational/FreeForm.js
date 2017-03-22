import React, { PropTypes, Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { map, nth, pipe, equals } from 'ramda';

import { binaryColors } from '../constants/colors';
import { count } from '../utils/ramda';

class FreeForm extends Component {

  static propTypes = {
    question: PropTypes.object.isRequired
  };

  state = {
    text: ""
  };

  render() {
    const { question: { text, answers } } = this.props;

    console.log(answers);
    const body = answers.map((answer) => answer[1]);

    return (
        <div className="question">
          <h1>{ text }</h1>
          { body }
        </div>
      );
    }
}

export default FreeForm;
