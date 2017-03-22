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
    return (
        <div className="question">
          <h1>Dummy</h1>
        </div>
      );
    }
}

export default FreeForm;
