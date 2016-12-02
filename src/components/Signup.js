import React, { PropTypes } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Parse } from 'parse';
import { browserHistory } from 'react-router';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = new Parse.User({
      username: this.state.email,
      email: this.state.email,
      password: this.state.password
    });

    user.signUp().then(
      function() {
        browserHistory.push('/');
      }, function(err) {
        alert(err.message);
      } 
    );
  }

  render() {
    return (
      <Jumbotron>
        <h1>Sign up</h1>
        <form>
          <label>
            Email:
            <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
          </label>
          <label>
            Password:
            <input type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
          </label>
          <input type="submit" onClick={this.handleSubmit}/>
        </form>    
      </Jumbotron>
    );
  }
}

Signup.propTypes = {
  children: PropTypes.element
};

export default Signup;
