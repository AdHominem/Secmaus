import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

const iconButtonRowRequiredProps = {
  buttons: PropTypes.array.isRequired,
};

function IconButtonRow({ buttons }) {
  return (
    <span className="icon-button-row">
      { buttons.map(b =>
          b.onClick
          ? <a onClick={b.onClick}><FontAwesome name={b.icon}/></a>
          : <Link to={b.link}><FontAwesome name={b.icon}/></Link>
      ) }
    </span>
  );
}

IconButtonRow.propTypes = iconButtonRowRequiredProps;

export default IconButtonRow;
