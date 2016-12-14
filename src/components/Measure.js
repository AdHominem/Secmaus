import React from 'react';
import { find, propEq } from 'ramda';
import { Link } from 'react-router';
import Comments from './Comments';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Measure extends React.Component {
  render() {
    const id = this.props.params.measureId;
    const measure = find(propEq('id', id), this.props.measures);
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
          <p>{measure.description}</p>
          <Link to={`/measure/${measure.id}/edit`}>
            Bearbeiten
          </Link>
        <br/>
          <Link to={`/measure/${measure.comments}/edit`}>
            Kommentieren
          </Link>
        </div>

        <Comments measure={measure}/>

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
