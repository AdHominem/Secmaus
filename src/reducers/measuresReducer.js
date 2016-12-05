import { ADD_MEASURE } from '../constants/actionTypes';

// https://facebook.github.io/react/docs/update.html
import update from 'immutability-helper';

export default function measuresReducer(state = {measures: []}, action) {
  console.dir(action.type);
  console.dir(action);
  console.dir(state);
  switch (action.type) {
    case ADD_MEASURE:
      return update(state, {measures: {
        $push: [{
          name: action.name,
          description: action.description
        }]
      }});
    default:
      return state;
  }
}
