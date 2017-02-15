import React from 'react';
import { Redirect, Route, IndexRoute } from 'react-router';
import { Parse } from 'parse';

import App from './containers/App';
import Measures from './containers/Measures';
import Measure from './containers/Measure';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Polls from './containers/Polls';
import NewPoll from './containers/NewPoll';
import Catalog from './presentational/Catalog';
import Search from './containers/Search';
import AllPolls from './containers/AllPolls';

function requireAuth(nextState, replace) {
  // If the user is not logged in,
  // redirect to the login page
  // and store the current url,
  // so that we can return to it later
  if (!Parse.User.current()) {
    replace({
      pathname: "/SIDATESecMaus/login",
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
    // <Redirect from="" to="/SIDATESecMaus/" />
    <Route path="/SIDATESecMaus/" >
      <IndexRoute component={Measures} onEnter={requireAuth}/>
      <Route path="measures" component={Measures} onEnter={requireAuth}/>
      <Route path="measure/:measureId/polls" component={Polls} onEnter={requireAuth}/>
      <Route path="measure/:measureId/polls/new" component={NewPoll} onEnter={requireAuth}/>
      <Route path="measure/:measureId" component={Measure} onEnter={requireAuth}/>
      <Route path="polls" component={AllPolls} onEnter={requireAuth}/>
      <Route path="login" component={Login}/>
      <Route path="signup" component={Signup}/>
      <Route path="search/:keyword" component={Search} onEnter={requireAuth}/>
    </Route>
  </Route>
  // <Route path="catalog" component={Catalog} onEnter={requireAuth}/>
  // <Route path="admin" component={AdminPage} onEnter={requireAdminAuth}/>
  // <Route path="*" component={NotFoundPage}/>
);
