import * as types from '../constants/actionTypes';
import { Parse } from 'parse';
import Alert from 'react-s-alert';


export function loadPolls() {
  return dispatch => {
    const Poll = Parse.Object.extend("Poll");
    const query = new Parse.Query(Poll);

    query.find({
      success: results => {
        for (let i = 0; i < results.length; i++) {
          const result = results[i];
          dispatch(addPoll(
            result.id,
            result.get("text"),
            result.get("choices"),
            result.get("answers"),
            result.get("measure"),
            result.get("closed")
          ));
        }
      },
      error: error => {
        console.log(error);
      }
    });
  };
}

export function savePoll(text, answers, measure) {
  return dispatch => {
    const Poll = Parse.Object.extend("Poll");
    const poll = new Poll();

    poll.set('text', text);
    poll.set('answers', answers);
    poll.set('measure', measure);

    console.dir(Parse.User.current());

    poll.save(null, {
      success: poll => {
        dispatch(addPoll(poll.id, text, answers, {}, false, measure));
        //browserHistory.push(`/measure/${comment.parentID}`);
      },
      error: (comment, error) => {
        console.log(error);
      }
    });
  };
}

/*
This method assumes that the user has not already answered!
 */
export function answerPoll(id, answer) {
  return dispatch => {
    const Poll = Parse.Object.extend("Poll");
    const query = new Parse.Query(Poll);

    const userId = Parse.User.current().id;
    const choice = { answer, userId };
    choices.push(choice);

    query.get(id, {
      success: poll => {
        poll.set('choices', choices);
        poll.save(null, {
          success: () => {
            dispatch(
              {
                type: types.ANSWER_POLL,
                id,
                answer
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

export function editComment(id, text, answers, choices, closed, measure) {
  return dispatch => {
    const Poll = Parse.Object.extend("Poll");
    const query = new Parse.Query(Poll);

    query.get(id, {
      success: poll => {
        poll.set('text', text);
        poll.set('answers', answers);
        poll.set('choices', choices);
        poll.set('closed', closed);
        poll.set('measure', measure);
        poll.save(null, {
          success: () => {
            dispatch(
              {
                type: types.EDIT_COMMENT,
                text,
                id,
                answers,
                choices,
                closed,
                measure
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

export function addPoll(id, text, answers, choices, closed, measure) {
  return {
    type: types.ADD_COMMENT,
    text,
    id,
    answers,
    choices,
    closed,
    measure
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
