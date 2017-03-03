import React from 'react';
import { IndexRedirect, Route, IndexRoute } from 'react-router';
import { Parse } from 'parse';

import App from './containers/App';
import Measures from './containers/Measures';
import Measure from './containers/Measure';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Polls from './presentational/Polls';
import NewPoll from './presentational/NewPoll';
import EditPoll from './presentational/EditPoll';
import Search from './containers/Search';
import AllPolls from './presentational/AllPolls';

function requireAuth(nextState, replace) {
  // If the user is not logged in,
  // redirect to the login page and store the current url,
  // so that we can return to it later
  if (!Parse.User.current()) {
    replace({
      pathname: "/SIDATESecMaus/login",
      query: { return_to: nextState.location.pathname }
    });
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/SIDATESecMaus/measures" />
    <Route path="/SIDATESecMaus" >
      <IndexRedirect to="measures" />
      <Route path="measures" component={Measures} onEnter={requireAuth}/>
      <Route path="measure/:measureId" component={Measure} onEnter={requireAuth}/>
      <Route path="measure/:measureId/polls" component={Polls} onEnter={requireAuth}/>
      <Route path="measure/:measureId/polls/new" component={NewPoll} onEnter={requireAuth}/>
      <Route path="measure/:measureId/polls/:pollId/edit" component={EditPoll} onEnter={requireAuth}/>
      <Route path="polls" component={AllPolls} onEnter={requireAuth}/>
      <Route path="login" component={Login}/>
      <Route path="signup" component={Signup}/>
      <Route path="search/:keyword" component={Search} onEnter={requireAuth}/>
    </Route>
  </Route>
);
