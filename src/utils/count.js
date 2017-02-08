import { curry } from 'ramda';

export const count = curry(
  (pred, list) => list.filter(pred).length
);
