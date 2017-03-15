import React, { PropTypes } from 'react';

const buttonRowRequiredProps = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  disableSubmit: PropTypes.bool
};

function ButtonRow({ onClose, onSubmit, disableSubmit}) {
  return (
    <div className="button-row">
      <button className="button-danger" onClick={onClose}>Abbrechen</button>
      <button className="button-success" onClick={onSubmit} disabled={disableSubmit}>OK</button>
    </div>
  );
}

ButtonRow.propTypes = buttonRowRequiredProps;

export default ButtonRow;
