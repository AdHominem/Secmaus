import { pick, reject, propEq, append } from 'ramda';

import { ADD_POLL, DELETE_POLL, EDIT_POLL, CLOSE_POLL } from '../constants/actionTypes';
import { createReducer, updateById } from '../utils/ramda';

export default createReducer([], {
  [ADD_POLL]:    (action) => append(pick(['text', 'id', 'measureId', 'closed'], action)),
  [DELETE_POLL]: (action) => reject(propEq('id', action.id)),
  [CLOSE_POLL]:  (action) => updateById(action.id, {closed: {$set: action.closed}}),
  [EDIT_POLL]:   (action) => updateById(action.id, {text: {$set: action.text}})
});
