import React, { PropTypes, Component } from 'react';

class UserWidget extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {
    const body = (this.props.comment) ? <div>{ this.props.comment }</div> : null;

    return (
      <div className="user-widget">
        <img src = "http://orig03.deviantart.net/d2db/f/2011/164/c/7/random_pokemon_icon_2_by_kniye-d3is3vv.png" alt = "avatar" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        { body }
      </div>
    )
  }
}

export default UserWidget;
