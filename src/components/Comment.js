import React from 'react';

export default class Comments extends React.Component {
  render() {
    const comment = this.props.comment;
    if (comment) {
      return (
        <div className="comment">
          <p>{comment.text}</p>
          <p>{comment.user.username}</p>
          <p>{comment.parentID}</p>
        </div>

      );
    }

    return (
      // TODO: 404
      <h1>Keinen Kommentar mit dieser ID gefunden</h1>
    );
  }
}
