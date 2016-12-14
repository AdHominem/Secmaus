import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import MeasureForm from './MeasureForm';
import { Jumbotron } from 'react-bootstrap';
import Initicon from 'react-initicon';

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
        <Initicon
          size={100}
          text={measure.createdBy.username + "name"}
          // seed={measure.createdBy.email}
          seed={23}
          single={false}
        />
      </Link>
    );
    return (
      <div class="measures-container">
        <Link to={'/measures/new'}>Neue Maßnahme</Link>
        <div className="measures">
          {body}
        </div>
      </div>
    );
  }
}

export default Measures;
