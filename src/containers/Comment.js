import React, { PropTypes } from 'react';
import CommentForm from '../components/CommentForm';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/commentsActions';
import UserWidget from '../components/UserWidget';
import Comments from '../containers/Comments';

class Comment extends React.Component {
  static propTypes = {
    commentsActions: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequried
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

    return (
      // parentId is set to the id of the current comment,
      // so we can reuse the normal CommentForm
      <div className="comment">
        <br/>

        <UserWidget user={comment.user} comment={comment} callbacks= {{ onClick: this.openModal, handleDeleteComment }}/>
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
