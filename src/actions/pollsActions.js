import * as types from "../constants/actionTypes";
import { saveQuestion, deleteQuestion, editQuestion } from "./questionsActions";
import { Parse } from "parse";
import Alert from "react-s-alert";
import { forEach } from "ramda";

export function loadPolls() {
  return (dispatch, getState) => {
    const { polls } = getState();

    if (polls.length == 0) {
      const Poll = Parse.Object.extend("Poll");
      const query = new Parse.Query(Poll);

      query.find().then(
        forEach(result => dispatch(
          addPoll(
            result.id,
            result.get("text"),
            result.get("closed"),
            result.get("measureId")
          )
        ))
      ).catch(
        () => Alert.error("Umfragen konnten nicht geladen werden")
      );
    }
  };
}

export function savePoll(text, questions, measureId) {
  return dispatch => {
    const Poll = Parse.Object.extend("Poll");
    const poll = new Poll();

    poll.set('text', text);
    poll.set('closed', false);
    poll.set('measureId', measureId);

    poll.save(null).then(
      (poll, i) => {
        questions.forEach(question => dispatch(saveQuestion(question.choices, question.questionType, question.text, poll.id, i)));
        dispatch(addPoll(poll.id, text, false, measureId));
      }    
    ).catch(
      () => Alert.error("Umfrage konnte nicht gespeichert werden")
    );
  };
}

export function editPoll(id, text, questions, measureId) {
  return dispatch => {
    const Poll = Parse.Object.extend("Poll");
    const query = new Parse.Query(Poll);

    query.get(id).then(
      poll => {
        poll.set('id'. id);
        poll.set('text', text);
        poll.set('measureId', measureId);
        return poll.save(null);
      }
    ).then(
      () => {
        questions.forEach(question => dispatch(editQuestion(question.id, question.choices, question.text)));
        dispatch({
          type: types.EDIT_POLL,
          id,
          text,
          measureId
        });
      }
    ).then(
      () => Alert.success("Umfrage erfolgreich bearbeitet")
    ).catch(
      () => Alert.error("Umfrage konnte nicht bearbeitet werden")
    );
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

    query.get(id).then(
      poll => {
        questions.forEach(question => dispatch(deleteQuestion(question.id)));
        poll.destroy({});
        dispatch({
          type: types.DELETE_POLL,
          id: id
        });
        Alert.success("Umfrage erfolgreich gelöscht");
      }
    ).catch(
      () => Alert.error("Umfrage konnte nicht gelöscht werden")
    );
  };
}

export function closePoll(id, closed) {
  return dispatch => {
    const Poll = Parse.Object.extend("Poll");
    const query = new Parse.Query(Poll);

    query.get(id).then(
      poll => {
        poll.set('closed', closed);
        return poll.save(null);
      }
    ).then(
      () => {
        dispatch({
          type: types.CLOSE_POLL,
          id,
          closed,
        });
        Alert.success("Umfrage " + (closed ? "geschlossen" : "geöffnet"));
      }
    ).catch(
      () => Alert.error("Umfrage konnte nicht" + (closed ? "geschlossen" : "geöffnet") + "werden")
    );
  };
}

