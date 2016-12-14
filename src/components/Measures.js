import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import MeasureForm from './MeasureForm';
import { Jumbotron } from 'react-bootstrap';

class Measures extends React.Component {
  static propTypes = {
    measures: PropTypes.array.isRequired,
    measureActions: PropTypes.object.isRequired
  };

  render() {
    const { measureActions, measures } = this.props;
    console.dir(measures);
    const body = measures.map((measure, i) =>
      <li key={i}>
        <Link to={`/measure/${measure.id}`}>
          {measure.name}
        </Link>
      </li>
    );
    return (
      <div>
        <ul>
          {body}
        </ul>
        <Jumbotron>
          <h2>Maßname hinzufügen</h2>
          <MeasureForm saveMeasure={measureActions.saveMeasure} />
        </Jumbotron>
      </div>
    );
  }
}

export default Measures;
