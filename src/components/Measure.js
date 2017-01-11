import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FontAwesome from 'react-fontawesome';
import { Parse } from 'parse';
import Comments from '../containers/Comments';
import Polls from '../containers/Polls';

const Measure = (props) => {
  const { measureActions, commentsActions, measure } = props;
  const { deleteMeasure } = measureActions;

  const handleDeleteMeasure = event => {
    deleteMeasure(measure.id);
    browserHistory.push('/measures');
    event.preventDefault();
  };

  if (measure) {
    return (
    <ReactCSSTransitionGroup
      transitionName="example"
      transitionEnterTimeout={0}
      transitionLeaveTimeout={0}
      transitionAppear={true}
      transitionAppearTimeout={3000}>

      <div className="measure">
        <h1>
          {measure.name}
          &nbsp;
          {Parse.User.current() && measure.createdBy.id === Parse.User.current().id &&
           <Link to={`/measure/${measure.id}/edit`}><FontAwesome name="edit"/></Link>}
          &nbsp;
          {Parse.User.current() && measure.createdBy.id === Parse.User.current().id &&
           <a onClick={handleDeleteMeasure}><FontAwesome name="trash"/></a>}
        </h1>
        <p dangerouslySetInnerHTML={{__html: measure.description}}/>
        <Comments commentsActions={commentsActions} parentId={measure.id}/>
        <Polls measureId={measure.id} />
      </div>

    </ReactCSSTransitionGroup>
    );
  }

  return (
    // TODO: 404
    <h1>Keine Maßnahme mit dieser ID gefunden</h1>
  );
};

Measure.propTypes = {
  measureActions: PropTypes.object.isRequired,
  commentsActions: PropTypes.object.isRequired
  // measure: PropTypes.object.isRequired
};

export default Measure;
