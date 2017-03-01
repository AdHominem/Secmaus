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

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const user = new Parse.User({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    });

    // TODO: This is a user action, should probably be in userActions instead
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
            console.log(this.state);
            console.log(this.props);
            Alert.error('Registrierung fehlgeschlagen');
          }
        });

        browserHistory.push('/');
      }, err => {
        alert(err.message);
      }
    );
  };

  onUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    const { username, email, password } = this.state;

      return (
        <Jumbotron>
          <h1>Sign up</h1>
          <form>
            <label>
              Username: <input value={username} onChange={this.onUsernameChange}/>
            </label>
            <br />
            <label>
              Email: <input value={email} onChange={this.onEmailChange}/>
            </label>
            <br />
            <label>
              Password: <input type="password" value={password} onChange={this.onPasswordChange} />
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
