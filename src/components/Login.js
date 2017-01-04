import React, { PropTypes } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Parse } from 'parse';
import { browserHistory } from 'react-router';
import Alert from 'react-s-alert';

class Login extends React.Component {
  render() {
    const handleSubmit = (event) => {
      event.preventDefault();
      Parse.User.logIn(this.refs.username.value, this.refs.password.value).then(
        function() {
          browserHistory.push('/');
          Alert.success('Login erfolgreich', {});
        }, function(err) {
          Alert.error('Login fehlgeschlagen');
        }
      );
    };

    return (
      <Jumbotron>
        <h1>Login</h1>
        <form>
          <label>
            Username: <input ref="username" />
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
