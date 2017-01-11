import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Polls from '../containers/Polls';

const Measures = props => {
  const { measures } = props;

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
};

Measures.propTypes = {
  measures: PropTypes.array.isRequired
};

export default Measures;
