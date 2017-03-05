import { concat } from 'ramda';

import { ADD_CATALOG_MEASURES } from '../constants/actionTypes';
import { createReducer } from '../utils/ramda';

export default createReducer([], {
  [ADD_CATALOG_MEASURES]: (action) => concat(action.measures)
});
