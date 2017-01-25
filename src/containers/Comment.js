import React, { PropTypes } from 'react';
import CommentForm from '../components/CommentForm';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/commentsActions';
import Parse from 'parse';
import Comments from '../containers/Comments';
import Identicon from '../components/Identicon';

class Comment extends React.Component {
  static propTypes = {
    commentsActions: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = { modalIsOpen: false };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // TODO
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { comment, commentsActions } = this.props;

    const handleDeleteComment = event => {
      this.props.commentsActions.deleteComment(comment.id);
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
        <br/>

        <div className="media">
          <div className="media-left" >
            <Identicon string={comment.user.getUsername()} size={10}/>
          </div>
          <div className="media-body">
            <h4 className="media-heading">{comment.user.getUsername()} schrieb am {comment.user.createdAt.toLocaleDateString()},
              {comment.createdAt.toLocaleTimeString()}</h4>
              <a onClick={onClick} >Bearbeiten</a>
              <a onClick={handleDeleteComment} >Löschen</a>
            <p dangerouslySetInnerHTML={{__html: comment.text}}/>
            {comment.user.id === Parse.User.current().id &&
            <div>
            </div>}
          </div>
        </div>

        <Comments commentsActions={commentsActions} parentId={comment.id}/>

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

function mapStateToProps() {
  return {};
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
