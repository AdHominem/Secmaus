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
    const body = measures.map((measure, i) =>
      <Link key={i} className="measure" to={`/measure/${measure.id}`}>
        {measure.name}
      </Link>
    );
    return (
      <div>
        <div className="measures">
          {body}
        </div>
        <div className="measures--form">
          <h2>Maßname hinzufügen</h2>
          <MeasureForm saveMeasure={measureActions.saveMeasure} />
        </div>
      </div>
    );
  }
}

export default Measures;
