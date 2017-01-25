import * as types from '../constants/actionTypes';
import { Parse } from 'parse';
import Alert from 'react-s-alert';


export function loadQuestions() {
  return dispatch => {
    const Question = Parse.Object.extend("Question");
    const query = new Parse.Query(Question);

    query.find({
      success: results => {
        for (let i = 0; i < results.length; i++) {
          const result = results[i];
          dispatch(addQuestion(
            result.id,
            result.get("answers"),
            result.get("choices"),
            result.get("questionType"),
            result.get("text"),
            result.get("pollId")
          ));
        }
      },
      error: error => {
        console.log(error);
      }
    });
  };
}

export function saveQuestion(answers, questionType, text, pollId) {
  return dispatch => {
    const Question = Parse.Object.extend("Question");
    const question = new Question();

    poll.set('answers', answers);
    poll.set('choices', []);
    poll.set('questionType', questionType);
    poll.set('text', text);
    poll.set('pollId', pollId);

    poll.save(null, {
      success: poll => {
        dispatch(addQuestion(poll.id, answers, [], text, pollId, questionType));
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
export function answerQuestion(id, answerIndex) {
  return dispatch => {
    const Question = Parse.Object.extend("Question");
    const query = new Parse.Query(Question);

    const userId = Parse.User.current().id;
    const choice = [ userId, answerIndex ];

    query.get(id, {
      success: question => {
        question.add("choices", choice);
        question.save(null, {
          success: () => {
            dispatch(
              {
                type: types.ANSWER_QUESTION,
                id,
                answerIndex,
                userId
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

export function editQuestion(id, text, answers, choices, questionType, pollId) {
  return dispatch => {
    const Question = Parse.Object.extend("Question");
    const query = new Parse.Query(Question);

    query.get(id, {
      success: question => {
        question.set('text', text);
        question.set('answers', answers);
        question.set('choices', choices);
        question.set('questionType', questionType);
        question.set('pollId', pollId);
        question.save(null, {
          success: () => {
            dispatch(
              {
                type: types.EDIT_QUESTION,
                text,
                id,
                answers,
                choices,
                questionType,
                pollId
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

export function addQuestion(id, answers, choices, text, pollId, questionType) {
  return {
    type: types.ADD_QUESTION,
    id,
    answers,
    choices,
    text,
    pollId,
    questionType
  };
}

export function deleteQuestion(id) {
  return dispatch => {
    const Question = Parse.Object.extend("Question");
    const query = new Parse.Query(Question);
    query.get(id, {
      success: question => {
        question.destroy({});
        dispatch({
          type: types.DELETE_QUESTION,
          id: id
        });
        Alert.success('Frage erfolgreich gelöscht');
      },
      error: (comment, error) => {
        Alert.error('Frage konnte nicht gelöscht werden');
      }
    });
  };
}