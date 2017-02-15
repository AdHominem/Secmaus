import React, { PropTypes } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Parse } from 'parse';
import { browserHistory } from 'react-router';
import Alert from 'react-s-alert';

class Login extends React.Component {
  render() {
    const { measureActions, commentActions, userActions, pollsActions, catalogActions, questionActions } = this.props;

    const handleSubmit = event => {
      event.preventDefault();
      Parse.User.logIn(this.refs.username.value, this.refs.password.value).then(
        () => {
          measureActions.loadMeasures();
          commentActions.loadComments();
          userActions.loadUserPermissions();
          pollsActions.loadPolls();
          questionActions.loadQuestions();
          catalogActions.loadMeasures();

          browserHistory.push('/');
          Alert.success('Login erfolgreich');
        }, () => {
          Alert.error('Login fehlgeschlagen');
        }
      );
    };

    return (
      <Jumbotron>
        <h1>Login</h1>
        <div>
          <label>
            Username: <input ref="username" />
          </label>
          <label>
            Password: <input type="password" ref="password" />
          </label>
          <button onClick={handleSubmit}>Log In</button>
        </div>
      </Jumbotron>
    );
  }
}

Login.propTypes = {
  children: PropTypes.element,
  measureActions: PropTypes.object,
  commentActions: PropTypes.object,
  userActions: PropTypes.object
};

export default Login;
