import { ADD_QUESTION, ANSWER_QUESTION, DELETE_QUESTION, EDIT_QUESTION } from '../constants/actionTypes';
import { map, filter } from 'ramda';

import update from 'immutability-helper';

export default function questionsReducer(state = {questions: []}, action) {
  switch (action.type) {
    case ADD_QUESTION:
      return update(state, {questions: {
        $push: [{
          text: action.text,
          id: action.id,
          answers: action.answers,
          choices: action.choices,
          pollId: action.pollId,
          questionType: action.questionType,
          index: action.index
        }]
      }});
    case EDIT_QUESTION:
      return update(state, {questions: {
        $apply: map(question =>
          (question.id === action.id ? {
              text: action.text,
              id: action.id,
              choices: action.choices
            } : question))
      }});
    case ANSWER_QUESTION:
      return update(state, {questions: {
        $apply: map(question =>
          (question.id === action.id ?
              update(question, {answers: {
                $push: [[
                  action.userId,
                  action.answerIndex
                ]]
              }}) : question))
      }});
    case DELETE_QUESTION:
      return update(state, {questions: {
        $apply: filter(question => question.id !== action.id)
      }});
    default:
      return state;
  }
}
