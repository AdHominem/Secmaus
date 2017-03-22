import React, { PropTypes } from 'react';

import PollForm from '../containers/PollForm';

const newPollRequiredProps = {
  params: PropTypes.object.isRequired
};

function NewPoll(props) {
  const { params: { measureId } } = props;

  return (
    <div className="new-poll">
      <h2>Umfrage hinzufügen</h2>
      <PollForm measureId={ measureId } />
    </div>
  );
}

NewPoll.propTypes = newPollRequiredProps;

export default NewPoll;
