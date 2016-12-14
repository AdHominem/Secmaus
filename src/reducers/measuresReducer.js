import * as types from '../constants/actionTypes';
import { map, filter } from 'ramda';

// https://facebook.github.io/react/docs/update.html
import update from 'immutability-helper';

export default function measuresReducer(state = {measures: []}, action) {
  switch (action.type) {
    case types.ADD_MEASURE:
      return update(state, {measures: {
        $push: [{
          name: action.name,
          description: action.description,
          id: action.id
        }]
      }});
    case types.EDIT_MEASURE:
      return update(state, {measures: {
        $apply: map((measure) => 
          (measure.id === action.id ?
            {
              name: action.name,
              description: action.description,
              id: action.id
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
