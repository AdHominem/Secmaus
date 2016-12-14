import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Jumbotron } from 'react-bootstrap';
import Comment from './Comment'

class Comments extends React.Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    commentsActions: PropTypes.object.isRequired
  };

  render() {
    const { commentsActions, comments } = this.props;
    const body = comments.map((comment, i) =>
      <li key={i}>
        <Comment comment={comment}/>
      </li>
    );

    return (
      <div>
        <ul>
          {body}
        </ul>
      </div>
    );
  }
}

export default Comments;
