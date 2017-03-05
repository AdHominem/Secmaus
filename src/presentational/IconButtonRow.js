import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

const iconButtonRowRequiredProps = {
  buttons: PropTypes.array.isRequired,
};

function IconButtonRow({ buttons }) {
  return (
    <span className="icon-button-row">
      { buttons.map((b, i) =>
          b.onClick
          ? <a key={i} onClick={b.onClick}><FontAwesome name={b.icon}/></a>
          : <Link key={i} to={b.link}><FontAwesome name={b.icon}/></Link>
      ) }
    </span>
  );
}

IconButtonRow.propTypes = iconButtonRowRequiredProps;

export default IconButtonRow;
