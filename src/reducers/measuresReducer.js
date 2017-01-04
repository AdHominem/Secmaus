import * as types from '../constants/actionTypes';
import { map, filter } from 'ramda';

import update from 'immutability-helper';

export default function measuresReducer(state = {loaded: false, measures: []}, action) {
  switch (action.type) {
    case types.ADD_MEASURE:
      return update(state, {measures: {
        $push: [{
          name: action.name,
          description: action.description,
          id: action.id,
          createdBy: action.createdBy
        }]
      }});
    case types.EDIT_MEASURE:
      return update(state, {measures: {
        $apply: map(measure =>
          (measure.id === action.id ?
            {
              name: action.name,
              description: action.description,
              id: measure.id,
              createdBy: measure.createdBy
            } : measure))
      }});
    case types.DELETE_MEASURE:
      return update(state, {measures: {
        $apply: filter((measure) => measure.id !== action.id)
      }});
    default:
      return state;
  }
}
