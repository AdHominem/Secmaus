import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Jumbotron } from 'react-bootstrap';
import CommentForm from './CommentForm';
import CommentEditForm from './CommentEditForm';
import { Parse } from 'parse';


class Comments extends React.Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    commentsActions: PropTypes.object.isRequired,
    parentId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      toggleEdit: false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick (event) {
    this.setState({
      toggleEdit: !this.state.toggleEdit
    });
    event.preventDefault();
  }

  toggleEdit() {
    this.setState({
      toggleEdit: !this.state.toggleEdit
    });
  }


  render() {




    const { commentsActions, comments, parentId } = this.props;
    const body = comments.map((comment, i) =>
        <div key={i} className="comment">
          <br/>
          <h4>{comment.user.getUsername()} schrieb am {comment.user.createdAt.toLocaleDateString()},
            {comment.user.createdAt.toLocaleTimeString()}</h4>
          <p dangerouslySetInnerHTML={{__html: comment.text}}></p>
          { comment.user.id === Parse.User.current().id &&
            <div>
              <a onClick={this.onClick.bind(this)} >Bearbeiten</a>&nbsp;
              <a onClick={() => this.props.commentsActions.deleteComment(comment.id)} >Löschen</a>
            </div>}
          { this.state.toggleEdit && <CommentEditForm editComment={commentsActions.editComment} comment={comment}
                                                      toggleEdit={this.toggleEdit.bind(this)} /> }
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
