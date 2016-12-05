import React, { PropTypes } from 'react';
import { Nav, Navbar, NavItem, Row, Col } from 'react-bootstrap';
import { Parse } from 'parse';
import { LinkContainer } from 'react-router-bootstrap';
import { browserHistory } from 'react-router';


class App extends React.Component {
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
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              SIDATE SecMaus
            </Navbar.Brand>
          </Navbar.Header>
          {headerItems}
        </Navbar>
        <div className="container-fluid">
          <Row>
            <Col sm={3} md={2} className="sidebar"></Col>
            <Col sm={9} md={10} className="main">
                {this.props.children}
            </Col>
          </Row>
        </div>

      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
