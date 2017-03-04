import React, { PropTypes } from "react";
import Modal from "react-modal";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Parse from "parse";

import IconButtonRow from '../presentational/IconButtonRow';
import CommentForm from "./CommentForm";
import * as actions from "../actions/commentsActions";
import Comments from "../containers/Comments";
import Identicon from "../presentational/Identicon";

class Comment extends React.Component {

  static propTypes = {
    commentsActions: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    depth: PropTypes.bool.isRequired,
  };

  state = { modalIsOpen: false };

  openModal = () => { this.setState({ modalIsOpen: true }); };

  afterOpenModal = () => { };

  closeModal = () => {this.setState({ modalIsOpen: false });};

  handleDeleteComment = (event) => {
  const { comment, comments } = this.props;
    this.props.commentsActions.deleteComment(comment.id, comments);
    event.preventDefault();
  };

  onClick = (event) => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
    event.preventDefault();
  };

  render() {

    const { comment, commentsActions, isAdmin, depth } = this.props;

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
            {
              (comment.user.id === Parse.User.current().id || isAdmin) &&
              <IconButtonRow buttons={[
                {icon: "edit", onClick: this.onClick},
                {icon: "trash", onClick: this.handleDeleteComment},
              ]} />
            }
          </h1>

          <p dangerouslySetInnerHTML={{__html: comment.text}}/>
          <div className="comment__children">
            <Comments commentsActions={commentsActions} parentId={comment.id} depth={depth}/>
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
  return {
    isAdmin: state.userReducer.isAdmin,
    comments: state.commentsReducer.comments
  };
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
