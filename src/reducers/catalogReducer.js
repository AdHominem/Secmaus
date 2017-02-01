import * as types from '../constants/actionTypes';
import update from 'immutability-helper';

export default function catalogReducer(state = {loaded: false, measures: []}, action) {
  switch (action.type) {
    case types.ADD_CATALOG_MEASURE:
      return update(state, {measures: {
        $push: [{
          name: action.name,
          category: action.category,
          id: action.id
        }]
      }});
    case types.ADD_CATALOG_MEASURES:
      return update(state, {measures: { $push: action.measures }});
    default:
      return state;
  }
}
