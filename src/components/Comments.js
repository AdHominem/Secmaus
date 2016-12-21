import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Jumbotron } from 'react-bootstrap';
import CommentForm from './CommentForm'

class Comments extends React.Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    commentsActions: PropTypes.object.isRequired,
    parentId: PropTypes.string.isRequired
  };

  render() {
    const { commentsActions, comments, parentId } = this.props;
    console.dir(comments);
    const body = comments.map((comment, i) =>
      <li key={i}>
        <div className="comment">
          <p>{comment.user.getUsername()} schrieb am {comment.user.createdAt.toLocaleDateString()}, {comment.user.createdAt.toLocaleTimeString()}</p>
          <p dangerouslySetInnerHTML={{__html: comment.text}}></p>
        </div>
      </li>
    );

    return (
      <div>
        <ul>
          {body}
        </ul>
        <h3>Kommmentar hinzufügen</h3>
        <CommentForm saveComment={commentsActions.saveComment} parentID={parentId} />
      </div>
    );
  }
}

export default Comments;
