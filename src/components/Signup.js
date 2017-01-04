import React, { PropTypes } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Parse } from 'parse';
import { browserHistory } from 'react-router';
import Alert from 'react-s-alert';

class Signup extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    const user = new Parse.User({
      username: this.refs.username.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    });

    user.signUp().then(
      function() {
        console.log("Before Role update!");

        const query = new Parse.Query(Parse.Role);

        query.equalTo("name", "Mitarbeiter");

        query.find({
          success: function (results) {
            let role = results[0];
            role.getUsers().add(user);
            role.save();
            Alert.success('Registrierung erfolgreich');
          },
          error: function (error) {
            Alert.error('Registrierung fehlgeschlagen');
          }
        });

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
            Username: <input ref="username" />
          </label>
          <br />
          <label>
            Email: <input ref="email" />
          </label>
          <br />
          <label>
            Password: <input type="password" ref="password" />
          </label>
          <br />
          <input type="submit" onClick={this.handleSubmit.bind(this)}/>
        </form>    
      </Jumbotron>
    );
  }
}

Signup.propTypes = {
  children: PropTypes.element,
  measureActions: PropTypes.object,
  commentActions: PropTypes.object,
  userActions: PropTypes.object
};

export default Signup;
