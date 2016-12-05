import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Parse } from 'parse';

import App from './components/App';
import Measures from './containers/Measures';
import Measure from './components/Measure';
import Login from './components/Login';
import Signup from './components/Signup';

function requireAuth(nextState, replace) {
  // If the user is not logged in,
  // redirect to the login page
  // and store the current url,
  // so that we can return to it later
  if (!Parse.User.current()) {
    replace({
      pathname: 'login',
      query: { return_to: nextState.location.pathname }
    });
  }
}

// function requireAdminAuth(nextState, replace) {
//   if (!Parse.User.current()) {
//     replace({
//       pathname: 'login',
//       query: { return_to: nextState.location.pathname }
//     });
//   }
// }

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Measures} onEnter={requireAuth}/>
    <Route path="measures" component={Measures} onEnter={requireAuth}>
      <Route path="/measure/:measureId" component={Measure}/>
    </Route>
    <Route path="login" component={Login}/>
    <Route path="signup" component={Signup}/>
  </Route>
  // <Route path="admin" component={AdminPage} onEnter={requireAdminAuth}/>
  // <Route path="*" component={NotFoundPage}/>
);
