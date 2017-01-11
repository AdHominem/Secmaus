import React, { PropTypes } from 'react';
import { find, propEq } from 'ramda';
import MeasureForm from './MeasureForm';
// import { Link } from 'react-router';
import { Jumbotron } from 'react-bootstrap';
import { browserHistory } from 'react-router';

const EditMeasure = props => {
  const id = props.params.measureId;
  const measure = find(propEq('id', id), props.measures);

  const { measureActions } = props;

  const saveMeasure = (name, description) => {
    measureActions.editMeasure(id, name, description);
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
};

EditMeasure.propTypes = {
  params: PropTypes.object.isRequired,
  measures: PropTypes.array.isRequired,
  measureActions: PropTypes.object.isRequired
};

export default EditMeasure;
