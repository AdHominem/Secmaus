import React, { PropTypes } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Parse } from 'parse';
import { browserHistory } from 'react-router';

class Login extends React.Component {
  render() {
    const handleSubmit = (event) => {
      event.preventDefault();
      Parse.User.logIn(this.refs.email.value, this.refs.password.value).then(
        function() {
          browserHistory.push('/');
        }, function(err) {
          alert(err.message);
        } 
      );
    };

    return (
      <Jumbotron>
        <h1>Login</h1>
        <form>
          <label>
            Email: <input ref="email" />
          </label>
          <label>
            Password: <input type="password" ref="password" />
          </label>
          <input type="submit" onClick={handleSubmit}/>
        </form>    
      </Jumbotron>
    );
  }
}

Login.propTypes = {
  children: PropTypes.element
};

export default Login;
