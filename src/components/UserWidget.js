import React, { PropTypes, Component } from 'react';

class UserWidget extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {

    const comment = this.props.comment;

    return (comment) ? ((
        <div className="media">
          <div className="media-left" >
            <img className="media-object" src="https://camo.githubusercontent.com/1852be4406db2d96a15a7098f8de8c19dcd2834d/68747470733a2f2f736967696c2e63757063616b652e696f2f536967696c3f696e7665727465643d31"/>
          </div>
          <div className="media-body">
            <h4 className="media-heading">{ comment.user.getUsername() } schrieb am { comment.user.createdAt.toLocaleDateString() },
              { comment.user.createdAt.toLocaleTimeString() }</h4>
            <p dangerouslySetInnerHTML={{__html: comment.text}}/>
          </div>
        </div>
      )) : <img className="media-object" src="https://camo.githubusercontent.com/1852be4406db2d96a15a7098f8de8c19dcd2834d/68747470733a2f2f736967696c2e63757063616b652e696f2f536967696c3f696e7665727465643d31" />
  }
}


export default UserWidget;
