import * as types from '../constants/actionTypes';
import { Parse } from 'parse';

export function loadUserPermissions() {
  return dispatch => {
    const query = new Parse.Query(Parse.Role);
    query.equalTo("name", "Administrator");
    query.equalTo("users", Parse.User.current());
    query.first().then(function(adminRole) {
        if (adminRole) {
          dispatch({
            type: types.SET_IS_ADMIN
          });
        }
    });
  };
}
