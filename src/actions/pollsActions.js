import * as types from '../constants/actionTypes';
import { saveQuestion } from './questionsActions';
import { Parse } from 'parse';
import Alert from 'react-s-alert';

export function loadPolls() {
  return dispatch => {
    const Poll = Parse.Object.extend("Poll");
    const query = new Parse.Query(Poll);

    query.find({
      success: results => {
        results.forEach(result => 
          dispatch(addPoll(
            result.id,
            result.get("text"),
            result.get("closed"),
            result.get("measureId")
          ))
        )},
      error: error => {
        console.log(error);
      }
    });
  };
}

export function savePoll(text, questions, measureId) {
  return dispatch => {
    const Poll = Parse.Object.extend("Poll");
    const poll = new Poll();

    poll.set('text', text);
    poll.set('closed', false);
    poll.set('measureId', measureId);

    console.log(questions);

    poll.save(null, {
      success: (poll,i) => {
        questions.forEach(question => dispatch(saveQuestion(question.choices, question.questionType, question.text, poll.id, i)));
        dispatch(addPoll(poll.id, text, false, measureId));
      },
      error: (comment, error) => {
        console.log(error);
      }
    });
  };
}

export function editPoll(id, text, closed, measureId) {
  return dispatch => {
    const Poll = Parse.Object.extend("Poll");
    const query = new Parse.Query(Poll);

    query.get(id, {
      success: poll => {
        poll.set('text', text);
        poll.set('closed', closed);
        poll.set('measureId', measureId);
        poll.save(null, {
          success: () => {
            dispatch(
              {
                type: types.EDIT_POLL,
                text,
                id,
                closed,
                measureId
              }
            );
          },
          error: error => {
            console.log(error);
          }
        });
      },
      error: error => {
        console.log(error);
      }
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

export function deletePoll(id) {
  return dispatch => {
    const Poll = Parse.Object.extend("Poll");
    const query = new Parse.Query(Poll);
    query.get(id, {
      success: poll => {
        poll.destroy({});
        dispatch({
          type: types.DELETE_POLL,
          id: id
        });
        Alert.success('Umfrage erfolgreich gelöscht');
      },
      error: (comment, error) => {
        Alert.error('Umfrage konnte nicht gelöscht werden');
      }
    });
  };
}
