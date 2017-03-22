import React, { PropTypes } from 'react';

import PollForm from '../containers/PollForm';

const newPollRequiredProps = {
  params: PropTypes.object.isRequired
};

function NewPoll(props) {
  const { params: { measureId } } = props;
  const questions = [
    {
      text: "Wie stark ist der Einfluss der Sicherheitsmaßnahme auf Ihren täglichen Arbeitsablauf",
      questionType: "likert",
      choices: [],
    },
    {
      text: "Konnten Sie die Notwendigkeit der Sicherheitsmaßnahme nachvollziehen?",
      questionType: "binary",
      choices: [],
    },
    {
      text: "Welche Verbesserungsvorschläge haben Sie für uns? Gibt es Sicherheitslücken, die wir bisher nicht beachtet haben?",
      questionType: "freeform",
      choices: [],
    },
    {
      text: "Wie wahrscheinlich ist es dass Sie einer erneuten Einführung dieser Sicherheitsmaßnahme zustimmen?",
      questionType: "likert",
      choices: [],
    }
  ]

  return (
    <div className="new-poll">
      <h2>Umfrage hinzufügen</h2>
      <PollForm
        text="Nutzerbefragung zur Sicherheitsmaßnahme"
        questions={ questions }
        measureId={ measureId }
      />
    </div>
  );
}

NewPoll.propTypes = newPollRequiredProps;

export default NewPoll;
