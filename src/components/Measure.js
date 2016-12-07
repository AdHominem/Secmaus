import React from 'react';
import { find, propEq } from 'ramda';
import { Link } from 'react-router';

class Measure extends React.Component {
  render() {
    const id = this.props.params.measureId;
    const measure = find(propEq('id', id), this.props.measures);
    if (measure) {
      return (
        <div className="measure">
          <h1>{measure.name}</h1>
          <p>{measure.description}</p>
          <Link to={`/measure/${measure.id}/edit`}>
            Bearbeiten
          </Link>
        </div>
      );
    }

    return (
      // TODO: 404
      <h1>Keine Maßnahme mit dieser ID gefunden</h1>
    );
  }
}

export default Measure;
