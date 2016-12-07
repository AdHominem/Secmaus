import { ADD_MEASURE, EDIT_MEASURE } from '../constants/actionTypes';
import { map } from 'ramda';

// https://facebook.github.io/react/docs/update.html
import update from 'immutability-helper';

export default function measuresReducer(state = {measures: []}, action) {
  switch (action.type) {
    case ADD_MEASURE:
      return update(state, {measures: {
        $push: [{
          name: action.name,
          description: action.description,
          id: action.id
        }]
      }});
    case EDIT_MEASURE:
      return update(state, {measures: {
        $apply: map((measure) => 
          (measure.id === action.id ?
            {
              name: action.name,
              description: action.description,
              id: action.id
            } : measure))
      }});
    default:
      return state;
  }
}
