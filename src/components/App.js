import React, { PropTypes } from 'react';
import { Nav, Navbar, NavItem, Row, Col, Grid } from 'react-bootstrap';
import { Parse } from 'parse';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, browserHistory } from 'react-router';

class App extends React.Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.loadMeasures();
  }

  logOut() {
    Parse.User.logOut().then(function() {
      browserHistory.push('/login');
    }, function(err) {
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
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
