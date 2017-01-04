import React, { PropTypes } from 'react';
import { Nav, Navbar, NavItem, Row, Col, Grid } from 'react-bootstrap';
import { Parse } from 'parse';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, browserHistory } from 'react-router';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';


class App extends React.Component {
  componentDidMount() {
    const { measureActions, commentActions, userActions } = this.props;
    measureActions.loadMeasures();
    commentActions.loadComments();
    userActions.loadUserPermissions();

    // const query = new Parse.Query('Measure');
    // const subscription = query.subscribe();

    // subscription.on('create', (measure) => {
    //   console.log(measure);
    //   measureActions.addMeasure(measure.id, measure.name, measure.description, undefined);
    // });
  }

  logOut() {
    Parse.User.logOut().then(() => {
      browserHistory.push('/login');
    }, err => {
      alert(err.message);
    });
  }

  render() {
    const headerItems = !Parse.User.current() ?
      <Nav>
        <LinkContainer to="login">
          <NavItem>Log In</NavItem>
        </LinkContainer>
        <LinkContainer to="signup">
          <NavItem>Sign up</NavItem>
        </LinkContainer>
      </Nav> :
      <Nav>
        <NavItem onClick={this.logOut}>Log Out</NavItem>
      </Nav>;
    return (
      <div className="sidate">
        <Navbar className="navbar">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">SIDATE SecMaus</Link>
            </Navbar.Brand>
          </Navbar.Header>
          {headerItems}
        </Navbar>
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
