import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import measuresReducer from './measuresReducer';
import commentsReducer from './commentsReducer';
import userReducer from './userReducer';
import pollsReducer from './pollsReducer';

const rootReducer = combineReducers({
  pollsReducer,
  measuresReducer,
  commentsReducer,
  userReducer,
  routing: routerReducer
});

export default rootReducer;
