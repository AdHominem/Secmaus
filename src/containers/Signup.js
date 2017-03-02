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
import * as pollsActions from '../actions/pollsActions';
import * as catalogActions from '../actions/catalogActions';
import * as questionActions from '../actions/questionsActions';

class Signup extends Component {

  static propTypes = {
    children: PropTypes.element,
    measureActions: PropTypes.object.isRequired,
    commentActions: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired,
    pollsActions: PropTypes.object.isRequired,
    catalogActions: PropTypes.object.isRequired,
    questionActions: PropTypes.object.isRequired
  };

  state = {
    username: "",
    email: "",
    password: ""
  };

  handleSubmit = (event) => {
    const {
      measureActions, commentActions,
      userActions, pollsActions,
      questionActions, catalogActions,
    } = this.props;

    event.preventDefault();
    const user = new Parse.User({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    });

    user.signUp().then(
      () => {
        const query = new Parse.Query(Parse.Role);
        query.equalTo("name", "Mitarbeiter");
        return query.find();
      }
    ).then(
      results => {
        let role = results[0];
        role.getUsers().add(user);
        return role.save(null);
      }
    ).then(
      user => {
        measureActions.loadMeasures();
        commentActions.loadComments();
        userActions.loadUserPermissions();
        pollsActions.loadPolls();
        questionActions.loadQuestions();
        catalogActions.loadMeasures();
        browserHistory.push('/');
        Alert.success('Registrierung erfolgreich');
      }
    ).catch(
      () => Alert.error('Registrierung fehlgeschlagen')
    )
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
    userActions: bindActionCreators(userActions, dispatch),
    pollsActions: bindActionCreators(pollsActions, dispatch),
    catalogActions: bindActionCreators(catalogActions, dispatch),
    questionActions: bindActionCreators(questionActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
