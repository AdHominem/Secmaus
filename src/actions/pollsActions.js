import * as types from "../constants/actionTypes";
import { saveQuestion, deleteQuestion } from "./questionsActions";
import { Parse } from "parse";
import Alert from "react-s-alert";

export function loadPolls() {
  return dispatch => {
    const Poll = Parse.Object.extend("Poll");
    const query = new Parse.Query(Poll);

    query.find({
      success: results => {
        results.forEach(result => dispatch(addPoll(
            result.id,
            result.get("text"),
            result.get("closed"),
            result.get("measureId")
          ))
        )},
      error: error => Alert.error("Umfragen konnten nicht geladen werden")
    });
  };
}

export function savePoll(text, questions, measureId) {
  return dispatch => {
    const Poll = Parse.Object.extend("Poll");
    const poll = new Poll();

    console.log(text);
    console.log(questions);
    console.log(measureId);

    poll.set('text', text);
    poll.set('closed', false);
    poll.set('measureId', measureId);

    poll.save(null, {
      success: (poll,i) => {
        questions.forEach(question => dispatch(saveQuestion(question.choices, question.questionType, question.text, poll.id, i)));
        dispatch(addPoll(poll.id, text, false, measureId));
      },
      error: error => Alert.error("Umfrage konnte nicht gespeichert werden")
    });
  };
}

export function editPoll(id, text, questions, measureId) {
  return dispatch => {
    const Poll = Parse.Object.extend("Poll");
    const query = new Parse.Query(Poll);

    query.get(id, {
      success: poll => {
        poll.set('text', text);
        poll.set('questions', questions);
        poll.set('measureId', measureId);
        poll.save(null, {
          success: () => {
            dispatch(
              {
                type: types.EDIT_POLL,
                text,
                questions,
                measureId
              }
            );
          },
          error: error => Alert.error("Zu bearbeitende Umfrage konnte nicht geladen werden")
        });
      },
      error: error => Alert.error("Umfrage konnte nicht gespeichert werden")
    });
  };
}

export function addPoll(id, text, closed, measureId) {
  return {
    type: types.ADD_POLL,
    id,
    text,
    measureId,
    closed
  };
}

export function deletePoll(id, questions) {
  return dispatch => {
    const Poll = Parse.Object.extend("Poll");
    const query = new Parse.Query(Poll);

    query.get(id, {
      success: poll => {
        questions.forEach(question => dispatch(deleteQuestion(question.id)));
        poll.destroy({});
        dispatch({
          type: types.DELETE_POLL,
          id: id
        });
        Alert.success("Umfrage erfolgreich gelöscht");
      },
      error: error => Alert.error("Umfrage konnte nicht gelöscht werden")
    });
  };
}
