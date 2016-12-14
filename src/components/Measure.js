import React from 'react';
import { find, propEq } from 'ramda';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { browserHistory } from 'react-router';
import { Parse } from 'parse';
import Comments from './Comments'

class Measure extends React.Component {
  render() {
    const { deleteMeasure } = this.props.measureActions;
    const measure = this.props.measure;
    const comments = this.props.comments.filter((comment) => (comment.parentID === measure.id));

    const handleDeleteMeasure = (event) => {
      deleteMeasure(id);
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
          <h1>{measure.name}</h1>
          <p dangerouslySetInnerHTML={{__html: measure.description}}></p>
          <Link to={`/measure/${measure.id}/edit`}>
            Bearbeiten
          </Link>&nbsp;
          <Link to={`/comments/${measure.id}`}>
            Kommentieren
          </Link>&nbsp;
          { measure.createdBy.id === Parse.User.current().id && <a onClick={handleDeleteMeasure}>Löschen</a> }
          <Comments comments={comments}/>
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
