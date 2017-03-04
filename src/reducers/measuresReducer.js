import * as types from '../constants/actionTypes';
import { reject, propEq, map } from 'ramda';

import update from 'immutability-helper';

export default function measuresReducer(state = {loaded: false, measures: []}, action) {
  switch (action.type) {
    case types.ADD_MEASURE:
      return update(state, {measures: {
        $push: [{
          name: action.name,
          description: action.description,
          id: action.id,
          createdAt: action.createdAt,
          createdBy: action.createdBy
        }]
      }});
    case types.EDIT_MEASURE:
      return update(state, {measures: {
        $apply: map(measure =>
          measure.id === action.id ?
          update(measure, {name: {$set: action.name}, description: {$set: action.description}}) :
          measure)
      }});
    case types.DELETE_MEASURE:
      return update(state, {measures: {
        $apply: reject(propEq('id', action.id))
      }});
    default:
      return state;
  }
}
