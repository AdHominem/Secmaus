/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { Parse } from 'parse';
import routes from './routes';
import configureStore from './store/configureStore';

require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/styles.scss';
import './styles/styles.sass';
import './styles/font-awesome.min.css';
import './styles/roboto.css';
import './styles/jquery-3.1.1.min.js';
import './images/logo_sidate.png';
import './images/search-icon.png';

import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// Set up a connection to the parse server
Parse.initialize('SecMaus');
Parse.serverURL = 'https://api.umfrage.sidate.org/parse';
Parse.clientKey = 'CLIENT_KEY';

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>, document.getElementById('app')
);
