import { ADD_COMMENT, EDIT_COMMENT } from '../constants/actionTypes';
import { map } from 'ramda';

// https://facebook.github.io/react/docs/update.html
import update from 'immutability-helper';

export default function commentsReducer(state = {comments: []}, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return update(state, {comments: {
        $push: [{
          text: action.text,
          parentID: action.parentID,
          id: action.id,
          user: action.user
        }]
      }});
    case EDIT_COMMENT:
      return update(state, {comments: {
        $apply: map((comment) =>
          (comment.id === action.id ?
            {
              text: action.text,
              parentID: action.parentID,
              id: action.id,
              user: action.user
            } : comment))
      }});
    default:
      return state;
  }
}
