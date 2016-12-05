import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import MeasureForm from './MeasureForm';


class Measures extends React.Component {
  static propTypes = {
    measures: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.loadMeasures();
  }

  render() {
    const { actions, measures } = this.props;
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
        <MeasureForm saveMeasure={actions.saveMeasure} />
      </div>
    );
  }
}

export default Measures;
