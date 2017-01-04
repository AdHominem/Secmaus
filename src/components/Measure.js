import React from 'react';
import { find, propEq } from 'ramda';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FontAwesome from 'react-fontawesome';
import { browserHistory } from 'react-router';
import { Parse } from 'parse';
import Comments from './Comments';


class Measure extends React.Component {
  render() {
    const { deleteMeasure } = this.props.measureActions;
    const measureActions = this.props.measureActions;
    const commentsActions = this.props.commentsActions;
    const measure = this.props.measure;
    const comments = this.props.comments.filter(comment => (comment.parentID === measure.id));

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
            { Parse.User.current() && measure.createdBy.id === Parse.User.current().id &&
              <Link to={`/measure/${measure.id}/edit`}><FontAwesome name="edit"/></Link>}
            &nbsp;
            { Parse.User.current() && measure.createdBy.id === Parse.User.current().id &&
              <a onClick={handleDeleteMeasure}><FontAwesome name="trash"/></a> }
          </h1>
          <p dangerouslySetInnerHTML={{__html: measure.description}}></p>
          <Comments comments={comments} commentsActions={commentsActions} parentId={measure.id}/>
        </div>

      </ReactCSSTransitionGroup>
      );
    }

    return (
      // TODO: 404
      <h1>Keine Maßnahme mit dieser ID gefunden</h1>
    );
  }
}

export default Measure;
