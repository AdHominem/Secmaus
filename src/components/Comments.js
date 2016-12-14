import React from 'react';
import { Link } from 'react-router';

export default class Comments extends React.Component {
  render() {
    const comment = this.props.commentActions;
    if (comment) {
      return (

          <div className="measure">
            <h1>{comment.text}</h1>
            <p>{comment.parentId}</p>
            <Link to={`/comment/${comment.id}/edit`}>
              Bearbeiten
            </Link>
            <br/>
            <Link to={`/comment/${comment}/edit`}>
              Kommentieren
            </Link>
          </div>

      );
    }

    return (
      // TODO: 404
      <h1>Keine Maßnahme mit dieser ID gefunden</h1>
    );
  }
}
