import React, { PropTypes } from 'react';
import CommentForm from './CommentForm';
import Comment from '../containers/Comment';

class Comments extends React.Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    commentsActions: PropTypes.object.isRequired,
    parentId: PropTypes.string.isRequired
  };

  render() {
    const { commentsActions, comments, parentId } = this.props;

    return (
      <div>
        <ul>
          {comments.map((comment, i) => <Comment key={i} comment={comment} />)}
        </ul>
        <h3>Kommmentar hinzufügen</h3>
        <CommentForm saveComment={commentsActions.saveComment} parentID={parentId} />
      </div>
    );
  }
}

export default Comments;
