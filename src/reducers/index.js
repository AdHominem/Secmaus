import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import measuresReducer from './measuresReducer';

const rootReducer = combineReducers({
  measuresReducer,
  routing: routerReducer
});

export default rootReducer;
