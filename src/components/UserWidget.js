import React, { PropTypes, Component } from 'react';
import Parse from 'parse';

class UserWidget extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {

    const comment = this.props.comment;

    if (comment) {
      const { onClick, handleDeleteComment } = this.props.callbacks;
      return (
          <div className="media">
            <div className="media-left" >
              <img className="media-object" src="https://camo.githubusercontent.com/1852be4406db2d96a15a7098f8de8c19dcd2834d/68747470733a2f2f736967696c2e63757063616b652e696f2f536967696c3f696e7665727465643d31"/>
            </div>
            <div className="media-body">
              <h4 className="media-heading">{ comment.user.getUsername() } schrieb am { comment.createdAt },
                { comment.user.createdAt.toLocaleTimeString() }</h4>
              <p dangerouslySetInnerHTML={{__html: comment.text}}/>
              {comment.user.id === Parse.User.current().id &&
              <div>
                <a onClick={onClick} >Bearbeiten</a>
                <a onClick={handleDeleteComment} >Löschen</a>
              </div>}
            </div>
          </div>
        )
    } else {
      return <img className="media-object" src="https://camo.githubusercontent.com/1852be4406db2d96a15a7098f8de8c19dcd2834d/68747470733a2f2f736967696c2e63757063616b652e696f2f536967696c3f696e7665727465643d31" />
    }
  }
}


export default UserWidget;
