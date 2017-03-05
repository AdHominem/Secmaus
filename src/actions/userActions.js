import { Parse } from 'parse';

import { SET_IS_ADMIN } from '../constants/actionTypes';

export function loadUserPermissions() {
  return dispatch => {
    const query = new Parse.Query(Parse.Role);
    query.equalTo("name", "Administrator");
    query.equalTo("users", Parse.User.current());
    query.first().then(adminRole => dispatch({
      type: SET_IS_ADMIN,
      isAdmin: !!adminRole
    }));
  };
}
