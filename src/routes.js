import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="login" component={Login}/>
    <Route path="signup" component={Signup}/>
  </Route>
    // <IndexRoute component={HomePage}/>
    // <Route path="fuel-savings" component={FuelSavingsPage}/>
    // <Route path="about" component={AboutPage}/>
    // <Route path="*" component={NotFoundPage}/>
);
