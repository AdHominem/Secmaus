import { always } from 'ramda';

import { SET_IS_ADMIN } from '../constants/actionTypes';
import { createReducer } from '../utils/ramda';

export default createReducer(false, {
  [SET_IS_ADMIN]: (action) => always(action.isAdmin)
});
