const pollTemplate = {
  text: "Nutzerbefragung zur Sicherheitsmaßnahme",
  questions: [
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
};

export default pollTemplate;
