import React, { PropTypes, Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Parse } from 'parse';
import { browserHistory } from 'react-router';
import Alert from 'react-s-alert';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as measureActions from '../actions/measuresActions';
import * as commentActions from '../actions/commentsActions';
import * as userActions from '../actions/userActions';

class Signup extends Component {

  static propTypes = {
    children: PropTypes.element,
    measureActions: PropTypes.object,
    commentActions: PropTypes.object,
    userActions: PropTypes.object
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const user = new Parse.User({
      username: this.refs.username.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    });

    user.signUp().then(
      () => {
        const query = new Parse.Query(Parse.Role);

        query.equalTo("name", "Mitarbeiter");

        query.find({
          success: results => {
            let role = results[0];
            role.getUsers().add(user);
            role.save();
            Alert.success('Registrierung erfolgreich');
          },
          error: () => {
            Alert.error('Registrierung fehlgeschlagen');
          }
        });

        browserHistory.push('/');
      }, err => {
        alert(err.message);
      }
    );
  };

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
            <button onClick={this.handleSubmit}>Sign Up</button>
          </form>
        </Jumbotron>
      );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    measureActions: bindActionCreators(measureActions, dispatch),
    commentActions: bindActionCreators(commentActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
