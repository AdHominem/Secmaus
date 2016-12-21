import { SET_IS_ADMIN } from '../constants/actionTypes';

export default function commentsReducer(state = {isAdmin: false}, action) {
  switch (action.type) {
    case SET_IS_ADMIN:
      return {isAdmin: true};
    default:
      return state;
  }
}