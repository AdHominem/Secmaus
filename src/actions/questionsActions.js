import * as types from '../constants/actionTypes';
import { Parse } from 'parse';
import Alert from 'react-s-alert';
import { forEach } from 'ramda';

export function loadQuestions() {
  return (dispatch, getState) => {
    const { questions } = getState();

    if (questions.length == 0) {
      const Question = Parse.Object.extend("Question");
      const query = new Parse.Query(Question);

      query.find().then(
        forEach(result => {
          dispatch(addQuestion(
            result.id,
            result.get("answers"),
            result.get("choices"),
            result.get("text"),
            result.get("pollId"),
            result.get("questionType"),
            result.get("index")
          ));
        })
      ).catch(
        () => Alert.error("Fragen konnten nicht geladen werden")
      );
    }
  };
}

export function saveQuestion(choices, questionType, text, pollId, index) {
  return dispatch => {
    const Question = Parse.Object.extend("Question");
    const question = new Question();

    question.set('answers', []);
    question.set('choices', choices);
    question.set('questionType', questionType);
    question.set('text', text);
    question.set('pollId', pollId);
    question.set('index', index);

    question.save(null).then(
      question => dispatch(
        addQuestion(question.id, [], choices, text, pollId, questionType, index)
      )
    ).catch(
      () => Alert.error("Frage konnte nicht gespeichert werden")
    );
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
    const answer = [ userId, answerIndex ];

    query.get(id).then(
      question => {
        question.add("answers", answer);
        return question.save(null);
      }
    ).then(
      () => dispatch({
        type: types.ANSWER_QUESTION,
        id,
        answerIndex,
        userId
      })
    ).catch(
      () => Alert.error("Frage konnte nicht beantwortet werden")
    );
  };
}

export function editQuestion(id, choices, text) {
  return dispatch => {
    const Question = Parse.Object.extend("Question");
    const query = new Parse.Query(Question);

    query.get(id).then(
      question => {
        question.set('choices', choices);
        question.set('text', text);
        return question.save(null);
      }
    ).then(
      () => dispatch({
        type: types.EDIT_QUESTION,
        id,
        choices,
        text
      })
    ).catch(
      () => Alert.error("Frage konnte nicht bearbeitet werden")
    );
  };
}

export function addQuestion(id, answers, choices, text, pollId, questionType, index) {
  return {
    type: types.ADD_QUESTION,
    id,
    answers,
    choices,
    text,
    pollId,
    questionType,
    index
  };
}

export function deleteQuestion(id) {
  return dispatch => {
    const Question = Parse.Object.extend("Question");
    const query = new Parse.Query(Question);
    query.get(id).then(
      question => {
        question.destroy({});
        dispatch({
          type: types.DELETE_QUESTION,
          id: id
        });
      }
    ).catch(
      () => Alert.error("Frage konnte nicht gelöscht werden")
    );
  };
}
