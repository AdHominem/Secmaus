import React, { PropTypes } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Parse } from 'parse';
import { browserHistory } from 'react-router';

class Signup extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    const user = new Parse.User({
      username: this.refs.email.value,
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
          },
          error: function (error) {
            console.log(error);
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
            Email: <input ref="email" />
          </label>
          <label>
            Password: <input type="password" ref="password" />
          </label>
          <input type="submit" onClick={this.handleSubmit.bind(this)}/>
        </form>    
      </Jumbotron>
    );
  }
}

Signup.propTypes = {
  children: PropTypes.element
};

export default Signup;
