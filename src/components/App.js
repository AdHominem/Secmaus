import React, { PropTypes } from 'react';
import { Parse } from 'parse';
import { Link, browserHistory } from 'react-router';
import Alert from 'react-s-alert';
import UserWidget from '../components/UserWidget';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';

class App extends React.Component {
  componentDidMount() {
    if (Parse.User.current()) {
      const {measureActions, commentActions, userActions, pollsActions} = this.props;
      measureActions.loadMeasures();
      commentActions.loadComments();
      userActions.loadUserPermissions();
      pollsActions.loadPolls();
    }
  }

  logOut() {
    Parse.User.logOut().then(() => {
      browserHistory.push('/login');
    }, err => {
      alert(err.message);
    });
  }

  render() {
    const currentUser = Parse.User.current();
    const headerItems = !currentUser ?
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li><Link to="login">Log In</Link></li>
          <li><Link to="signup">Sign up</Link></li>
        </ul>
      </div>:
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li><Link to="measures">Maßnahmen</Link></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              <UserWidget user={currentUser}/> <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li><a onClick={this.logOut}>Log Out</a></li>
            </ul>
          </li>
        </ul>
      </div>;
    return (
      <div className="sidate">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="/">SIDATE SecMaus</Link>
            </div>
            {headerItems}
          </div>
        </nav>
        <div className="main-container">
          <aside className="sidebar-container">
            <div className="sidebar-content">
              <div className="sidebar-logo">
                <a href="/">
                  <img src="https://sidate-portal.regioit.de/o/sidate-2-theme/images/sidate/logo_sidate.png" alt="" />
                </a>
                <img src="http://img.auctiva.com/imgdata/1/1/0/9/4/8/0/webimg/352982075_tp.jpg" alt="" />
              </div>
            </div>
          </aside>
          <main className="children-container">
            {this.props.children}
          </main>
        </div>
        <Alert
          stack={{limit: 3}}
          effect="bouncyflip"
        />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
