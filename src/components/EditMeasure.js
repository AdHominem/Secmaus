import React from 'react';
import { find, propEq } from 'ramda';
import MeasureForm from './MeasureForm';
// import { Link } from 'react-router';
import { Jumbotron } from 'react-bootstrap';
import { browserHistory } from 'react-router';

class EditMeasure extends React.Component {
  render() {
    const id = this.props.params.measureId;
    const measure = find(propEq('id', id), this.props.measures);

    const { actions } = this.props;

    const saveMeasure = (name, description) => {
      actions.editMeasure(id, name, description);
      browserHistory.push(`/measure/${measure.id}`);
    }; 

    if (measure) {
      return (
        <div className="measure">
          <Jumbotron>
            <h2>Maßname bearbeiten</h2>
            <MeasureForm
              saveMeasure={saveMeasure}
              name={measure.name}
              description={measure.description}
            />
          </Jumbotron>
        </div>
      );
    }

    return (
      // TODO: 404
      <h1>Keine Maßnahme mit dieser ID gefunden</h1>
    );
  }
}

export default EditMeasure;
