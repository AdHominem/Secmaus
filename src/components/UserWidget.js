import React, { PropTypes } from 'react';

class UserWidget extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="user-widget">
        <img src = "http://orig03.deviantart.net/d2db/f/2011/164/c/7/random_pokemon_icon_2_by_kniye-d3is3vv.png" alt = "avatar" />
      </div>
    )
  }
}


export default UserWidget;
