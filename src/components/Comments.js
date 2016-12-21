import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Jumbotron } from 'react-bootstrap';
import CommentForm from './CommentForm';
import { Parse } from 'parse';


class Comments extends React.Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    commentsActions: PropTypes.object.isRequired,
    parentId: PropTypes.string.isRequired
  };

  render() {
    const { commentsActions, comments, parentId } = this.props;
    const body = comments.map((comment, i) =>
        <div key={i} className="comment">
          <br/>
          <h4>{comment.user.getUsername()} schrieb am {comment.user.createdAt.toLocaleDateString()},
            {comment.user.createdAt.toLocaleTimeString()}</h4>
          <p dangerouslySetInnerHTML={{__html: comment.text}}></p>
          { comment.user.id === Parse.User.current().id && <p>Bearbeiten</p>}
        </div>
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
