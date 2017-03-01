import React, { PropTypes, Component } from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { propEq } from 'ramda';

import CommentForm from './CommentForm';
import Comment from './Comment';
import * as actions from '../actions/commentsActions';

class Comments extends Component {

  static propTypes = {
    comments: PropTypes.array.isRequired,
    commentsActions: PropTypes.object.isRequired,
    parentId: PropTypes.string.isRequired
  };

  state = { modalIsOpen: false };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal = () => {
    // TODO
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { commentsActions, comments, parentId } = this.props;
    return (
      <div className="comments">
        <ul>
          {comments.map((comment, i) => <Comment key={i} comment={comment} />)}
        </ul>
        <a onClick={this.openModal}>
          Antworten
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

function mapStateToProps(state, ownProps) {
  return {
    comments: state.commentsReducer.comments.filter(propEq('parentID', ownProps.parentId))
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
