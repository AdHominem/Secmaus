import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import CommentForm from './CommentForm';
import Comment from './Comment';
import * as actions from '../actions/commentsActions';


class Comments extends React.Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    commentsActions: PropTypes.object.isRequired,
    parentId: PropTypes.string.isRequired
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
    const { commentsActions, comments, parentId } = this.props;
    const ownComments = comments.filter(comment => (comment.parentID === parentId));

    if (ownComments.size > 0) { return; }

    return (
      <div className="comments">
        <ul>
          {ownComments.map((comment, i) => <Comment key={i} comment={comment} />)}
        </ul>
        <a onClick={this.openModal}>
          Kommentar hinzufügen
        </a>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Kommentar hinzufügen"
        >
          <CommentForm
            saveComment={
              (text, parentId) => {
                commentsActions.saveComment(text, parentId);
                this.closeModal();
              }
            }
            parentID={parentId}
            close={this.closeModal}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
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
)(Comments);
