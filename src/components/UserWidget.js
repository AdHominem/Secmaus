import React, { PropTypes, Component } from 'react';
import Parse from 'parse';
import Identicon from './Identicon';

class UserWidget extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    comment: PropTypes.object,
    callbacks: PropTypes.object
  };

  render() {
    const comment = this.props.comment;

    if (comment) {
      const { onClick, handleDeleteComment } = this.props.callbacks;
      return (
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
        );
    } else {
      return <Identicon string={Parse.User.current().getUsername()} size={10}/>;
    }
  }
}

export default UserWidget;
