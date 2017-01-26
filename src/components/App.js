import React, { PropTypes } from 'react';
import { Parse } from 'parse';
import { Link, browserHistory } from 'react-router';
import Alert from 'react-s-alert';
import Identicon from './Identicon';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';

class App extends React.Component {
  static propTypes = {
    measureActions: PropTypes.object.isRequired,
    commentActions: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired,
    pollsActions: PropTypes.object.isRequired
  };

  componentDidMount() {
    if (Parse.User.current()) {
      const {measureActions, commentActions, userActions, pollsActions, catalogActions} = this.props;
      measureActions.loadMeasures();
      commentActions.loadComments();
      userActions.loadUserPermissions();
      pollsActions.loadPolls();
      catalogActions.loadMeasures();
    }
  }

  logOut() {
    Parse.User.logOut().then(() => {
      browserHistory.push('/SIDATESecMaus/login');
    }, err => {
      alert(err.message);
    });
  }

  render() {
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
                  <li className="nav-link"><Link to="/SIDATESecMaus/catalog">Maßnahmenkatalog</Link></li>
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
                  <input type="search" placeholder="Enter Search" />
                  <button type="submit">
                    <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/search-icon.png" alt="Search Icon" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </header>
        <main>
          {this.props.children}
        </main>
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
