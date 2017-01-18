import { ADD_POLL, ANSWER_POLL, DELETE_POLL, EDIT_POLL } from '../constants/actionTypes';
import { map, filter } from 'ramda';

import update from 'immutability-helper';

export default function pollsReducer(state = {polls: []}, action) {
  switch (action.type) {
    case ADD_POLL:
      return update(state, {polls: {
        $push: [{
          text: action.text,
          id: action.id,
          answers: action.answers,
          choices: action.choices,
          measureId: action.measureId,
          closed: action.closed
        }]
      }});
    case EDIT_POLL:
      return update(state, {polls: {
        $apply: map(poll =>
          (poll.id === action.id ? {
              text: action.text,
              id: action.id,
              answers: action.answers,
              choices: action.choices,
              measureId: action.measureId,
              closed: action.closed
            } : poll))
      }});
    case ANSWER_POLL:
      return update(state, {polls: {
        $apply: map(poll =>
          (poll.id === action.id ?
            {
              id: action.id,
              answer: action.answer
            } : poll))
      }});
    case DELETE_POLL:
      return update(state, {polls: {
        $apply: filter(poll => poll.id !== action.id)
      }});
    default:
      return state;
  }
}
