import React, { PropTypes } from 'react';
import { Parse } from 'parse';
import { Link, browserHistory } from 'react-router';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Identicon from "../presentational/Identicon";

import * as measureActions from '../actions/measuresActions';
import * as commentActions from '../actions/commentsActions';
import * as userActions from '../actions/userActions';
import * as pollsActions from '../actions/pollsActions';
import * as catalogActions from '../actions/catalogActions';
import * as questionActions from '../actions/questionsActions';

class App extends React.Component {

  static propTypes = {
    measureActions: PropTypes.object.isRequired,
    commentActions: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired,
    pollsActions: PropTypes.object.isRequired,
    questionActions: PropTypes.object.isRequired,
    catalogActions: PropTypes.object.isRequired,
    children: PropTypes.element
  };

  state = {search: ""};

  componentDidMount() {
    const { measureActions, commentActions, userActions, pollsActions, catalogActions, questionActions } = this.props;
    if (Parse.User.current()) {
      measureActions.loadMeasures();
      commentActions.loadComments();
      userActions.loadUserPermissions();
      pollsActions.loadPolls();
      questionActions.loadQuestions();
      catalogActions.loadMeasures();
    }
  }

  logOut = () => {
    Parse.User.logOut().then(() => {
      browserHistory.push("/SIDATESecMaus/login");
    }, err => {
      alert(err.message);
    });
  };

  updateSearch = (event) => {
    this.setState({search: event.target.value});
    event.preventDefault();
  };

  startSearch = (event) => {
    browserHistory.push(`/SIDATESecMaus/search/${this.state.search}`);
    event.preventDefault();
  };

  render() {

    const { search } = this.state;

    return (
      <div className="sidate">
        <header className="navigation" role="banner">
          <div className="navigation-wrapper">
            <a href="javascript:void(0)" className="logo">
              <img src="https://sidate-portal.regioit.de/o/sidate-2-theme/images/sidate/logo_sidate.png" alt="" />
            </a>
            <a href="javascript:void(0)" className="navigation-menu-button" id="js-mobile-menu">MENU</a>
            <nav role="navigation">
              {
                Parse.User.current() ?
                <ul id="js-navigation-menu" className="navigation-menu show">
                  <li className="nav-link"><Link to="/SIDATESecMaus/measures">Maßnahmen</Link></li>
                  <li className="nav-link"><Link to="/SIDATESecMaus/polls">Umfragen</Link></li>
                  <li className="nav-link"><a onClick={this.logOut}>Log Out</a></li>
                </ul> :
                <ul id="js-navigation-menu" className="navigation-menu show">
                  <li className="nav-link"><Link to="/SIDATESecMaus/login">Log In</Link></li>
                  <li className="nav-link"><Link to="/SIDATESecMaus/signup">Sign up</Link></li>
                </ul>
              }
            </nav>
            <div className="navigation-tools">
              <div className="search-bar">
                <form role="search">
                  <input
                    type="search"
                    placeholder="Suchbegriff"
                    value={search}
                    onChange={this.updateSearch}
                  />
                  <button type="submit" onClick={this.startSearch}>
                    <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/search-icon.png" alt="Search Icon" />
                  </button>
                </form>
              </div>
              { 
                Parse.User.current() &&
                <div className="user-indicator">
                  <p>{ Parse.User.current().getUsername() }</p>
                </div>
              }
              {
                Parse.User.current() &&
                <div className="user-indicator">
                  <Identicon string={Parse.User.current().getUsername()} size={12}/>
                </div>
              }
            </div>
          </div>
        </header>
        <main>
          <div className="centered">
            {this.props.children}
          </div>
        </main>
        <Alert
          stack={{limit: 3}}
          effect="bouncyflip"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    measures: state.measuresReducer.measures
  };
}

function mapDispatchToProps(dispatch) {
  return {
    measureActions: bindActionCreators(measureActions, dispatch),
    commentActions: bindActionCreators(commentActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    pollsActions: bindActionCreators(pollsActions, dispatch),
    catalogActions: bindActionCreators(catalogActions, dispatch),
    questionActions: bindActionCreators(questionActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

