import { reject, propEq, pick, append } from 'ramda';

import { ADD_MEASURE, EDIT_MEASURE, DELETE_MEASURE } from '../constants/actionTypes';
import { createReducer, updateById } from '../utils/ramda';

export default createReducer([], {
  [ADD_MEASURE]: (action) => append(
    pick(['name', 'description', 'id', 'createdAt', 'createdBy'], action),
  ),
  [EDIT_MEASURE]: (action) => updateById(
    action.id,
    {name: {$set: action.name}, description: {$set: action.description}}
  ),
  [DELETE_MEASURE]: (action) => reject(propEq('id', action.id))
});
