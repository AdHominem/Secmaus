import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import MeasureForm from './MeasureForm';
import { Jumbotron } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class Measures extends React.Component {
  static propTypes = {
    measures: PropTypes.array.isRequired,
    measureActions: PropTypes.object.isRequired
  };

  render() {
    const { measureActions, measures, isAdmin } = this.props;
    // measureActions.loadMeasures();

    const body = measures.map((measure, i) =>
      <Link key={i} className="measure" to={`/measure/${measure.id}`}>
        {measure.name}
      </Link>
    );
    return (
    <ReactCSSTransitionGroup
      transitionName="example"
      transitionEnterTimeout={0}
      transitionLeaveTimeout={0}
      transitionAppear={true}
      transitionAppearTimeout={3000}>
      <div className="measures-container">
        <Link className="btn btn-primary" to={'/measures/new'}>Neue Maßnahme</Link>
        <div className="measures">
            {body}
        </div>
      </div>
    </ReactCSSTransitionGroup>
    );
  }
}

export default Measures;
