import { ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../constants/actionTypes';
import { map, filter } from 'ramda';

// https://facebook.github.io/react/docs/update.html
import update from 'immutability-helper';

export default function commentsReducer(state = {polls: []}, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return update(state, {polls: {
        $push: [{
          text: action.text,
          parentID: action.parentID,
          id: action.id,
          user: action.user,
          createdAt: action.createdAt
        }]
      }});
    case EDIT_COMMENT:
      return update(state, {polls: {
        $apply: map((comment) =>
          (comment.id === action.id ?
            {
              text: action.text,
              parentID: comment.parentID,
              id: comment.id,
              user: comment.user,
              createdAt: comment.createdAt
            } : comment))
      }});
    case DELETE_COMMENT:
      return update(state, {polls: {
        $apply: filter((comment) => comment.id !== action.id)
      }});
    default:
      return state;
  }
}
