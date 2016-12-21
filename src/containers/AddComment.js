import React, { PropTypes } from 'react';
import CommentForm from '../components/CommentForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/commentsActions';

class AddComment extends React.Component {
  static propTypes = {
    commentActions: PropTypes.object.isRequired
  };

  render() {
    const { commentsActions } = this.props;
    return (
      <div className="comment--form">
        <h2>Kommentar hinzufügen</h2>
        <CommentForm saveComment={commentsActions.saveComment} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    commentActions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddComment);
