import { ADD_POLL, DELETE_POLL, EDIT_POLL, CLOSE_POLL } from '../constants/actionTypes';
import { map, filter } from 'ramda';

import update from 'immutability-helper';

export default function pollsReducer(state = {polls: []}, action) {
  switch (action.type) {
    case ADD_POLL:
      return update(state, {polls: {
        $push: [{
          text: action.text,
          id: action.id,
          measureId: action.measureId,
          closed: action.closed
        }]
      }});
    case EDIT_POLL:
      return update(state, {polls: {
        $apply: map(poll =>
          (poll.id === action.id ? {
              id: action.id,
              text: action.text,
              questions: action.questions,
              measureId: action.measureId
            } : poll))
      }});
    case DELETE_POLL:
      return update(state, {polls: {
        $apply: filter(poll => poll.id !== action.id)
      }});
    case CLOSE_POLL:
      return update(state, {polls: {
        $apply: map(poll => (poll.id === action.id
            ? update(poll, {closed: {$set: action.closed}})
            : poll))
      }});
    default:
      return state;
  }
}
