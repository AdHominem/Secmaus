import React, { PropTypes } from "react";
import Modal from "react-modal";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Parse from "parse";

import CommentForm from "./CommentForm";
import * as actions from "../actions/commentsActions";
import Comments from "../containers/Comments";
import Identicon from "./Identicon";

class Comment extends React.Component {
  static propTypes = {
    commentsActions: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired
  };
  constructor() {
    super();
    this.state = { modalIsOpen: false };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() { this.setState({ modalIsOpen: true }); }
  afterOpenModal() { }
  closeModal() {this.setState({ modalIsOpen: false });}

  render() {
    const { comment, commentsActions } = this.props;

    const handleDeleteComment = event => {
      const { comments } = this.props;
      this.props.commentsActions.deleteComment(comment.id, comments);
      event.preventDefault();
    };

    const onClick = event => {
      this.setState({ modalIsOpen: !this.state.modalIsOpen });
      event.preventDefault();
    };

    return (
      // parentId is set to the id of the current comment,
      // so we can reuse the normal CommentForm
      <div className="comment">
        <div className="comment__image">
          <Identicon string={comment.user.getUsername()} size={10}/>
        </div>
        <div className="comment__content">
          <h1 className="media-heading">
            {comment.user.getUsername()} schrieb am {comment.user.createdAt.toLocaleDateString()}, {comment.createdAt.toLocaleTimeString()}
          </h1>
          {
            comment.user.id === Parse.User.current().id ?
            <p className="comment__detail">
              <a onClick={onClick} >Bearbeiten</a> \ <a onClick={handleDeleteComment} >Löschen</a>
            </p> :
            null
          }
          <p dangerouslySetInnerHTML={{__html: comment.text}}/>
          <div className="comment__children">
            <Comments commentsActions={commentsActions} parentId={comment.id}/>
          </div>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Kommentar hinzufügen"
        >
          <CommentForm
            saveComment={
              (text, parentId) => {
                commentsActions.editComment(parentId, text);
                this.closeModal();
              }
            }
            text={comment.text}
            parentID={comment.id}
            close={this.closeModal}
          />
        </Modal>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {comments: state.commentsReducer.comments};
}

function mapDispatchToProps(dispatch) {
  return {
    commentsActions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
