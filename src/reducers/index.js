import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import measuresReducer from './measuresReducer';
import commentsReducer from './commentsReducer';

const rootReducer = combineReducers({
  measuresReducer,
  commentsReducer,
  routing: routerReducer
});

export default rootReducer;
