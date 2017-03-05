import { reject, propEq, pick, append } from 'ramda';

import { ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../constants/actionTypes';
import { createReducer, updateById } from '../utils/ramda';

export default createReducer([], {
  [ADD_COMMENT]: (action) => append(pick(['text', 'parentID', 'id', 'user', 'createdAt'], action)),
  [EDIT_COMMENT]: (action) => updateById(action.id, {text: {$set: action.text}}),
  [DELETE_COMMENT]: (action) => reject(propEq('id', action.id))
});
