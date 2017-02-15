import { ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../constants/actionTypes';
import { map, filter } from 'ramda';

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
          user: action.user,
          createdAt: action.createdAt
        }]
      }});
    case EDIT_COMMENT:
      return update(state, {comments: {
        $apply: map((comment) =>
          comment.id === action.id ? update(comment, {text: {$set: action.text}}) : comment
        )
      }});
    case DELETE_COMMENT:
      return update(state, {comments: {
        $apply: filter((comment) => comment.id !== action.id)
      }});
    default:
      return state;
  }
}
