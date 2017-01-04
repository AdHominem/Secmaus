import React, { PropTypes } from 'react';
import CommentEditForm from '../components/CommentEditForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/commentsActions';
import { Parse } from 'parse';
import UserWidget from '../components/UserWidget';


class Comment extends React.Component {
  static propTypes = {
    commentsActions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { toggleEdit: false };
  }

  render() {
    const { comment, commentsActions } = this.props;

    const handleDeleteComment = event => {
      this.props.commentsActions.deleteComment(comment.id);
      event.preventDefault();
    };

    const onClick = event => {
      this.setState({ toggleEdit: !this.state.toggleEdit });
      event.preventDefault();
    };

    const toggleEdit = () => {
      this.setState({ toggleEdit: !this.state.toggleEdit });
    };

    return (
      // TODO: hier bräuchten wir eigentlich createdAt vom comment,
      // das wird aber nicht gespeichert
      <div className="comment">
        <br/>

      {this.state.toggleEdit ?
        <CommentEditForm editComment={commentsActions.editComment} comment={comment} toggleEdit={toggleEdit.bind(this)} />
        : <UserWidget user={ comment.user } comment={ comment }/>}

      {comment.user.id === Parse.User.current().id &&
      <div>
        <a onClick={onClick} >Bearbeiten</a>
        <a onClick={handleDeleteComment} >Löschen</a>
      </div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
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
