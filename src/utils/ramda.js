import { curry, ifElse, propEq, propOr, identity, map } from 'ramda';
import update from 'immutability-helper';

export const count = curry(
  (pred, list) => list.filter(pred).length
);

export const updateById = (id, changes) =>
  map(ifElse(propEq('id', id), e => update(e, changes), identity));

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](action)(state)
    } else {
      return state
    }
  }
}
