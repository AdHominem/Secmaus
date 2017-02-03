import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import measuresReducer from './measuresReducer';
import commentsReducer from './commentsReducer';
import userReducer from './userReducer';
import pollsReducer from './pollsReducer';
import questionsReducer from './questionsReducer';
import catalogReducer from './catalogReducer';

const rootReducer = combineReducers({
  pollsReducer,
  questionsReducer,
  measuresReducer,
  commentsReducer,
  userReducer,
  catalogReducer,
  routing: routerReducer
});

export default rootReducer;
