import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import measures from './measures';
import comments from './comments';
import user from './user';
import polls from './polls';
import questions from './questions';
import catalog from './catalog';

const rootReducer = combineReducers({
  polls,
  questions,
  measures,
  comments,
  isAdmin: user,
  catalog,
  routing: routerReducer
});

export default rootReducer;
