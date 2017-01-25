import { ADD_POLL, DELETE_POLL, EDIT_POLL } from '../constants/actionTypes';
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
              text: action.text,
              id: action.id,
              measureId: action.measureId,
              closed: action.closed
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
