import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import measuresReducer from './measuresReducer';
import commentsReducer from './commentsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  measuresReducer,
  commentsReducer,
  userReducer,
  routing: routerReducer
});

export default rootReducer;
