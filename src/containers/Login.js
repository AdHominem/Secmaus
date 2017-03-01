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

class Login extends Component {

  static propTypes = {
    children: PropTypes.element,
    measureActions: PropTypes.object.isRequired,
    commentActions: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired,
    pollsActions: PropTypes.object.isRequired,
    catalogActions: PropTypes.object.isRequired,
    questionActions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  onUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    const { username, password } = this.state;
    const {
      measureActions, commentActions,
      userActions, pollsActions,
      questionActions, catalogActions,
    } = this.props; 

    event.preventDefault();
    Parse.User.logIn(username, password).then(
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

  render() {
    const { username, password } = this.state;
    return (
      <Jumbotron>
      <h1>Login</h1>
      <div>
        <label>
          Username: <input value={username} onChange={this.onUsernameChange}/>
        </label>
        <label>
          Password: <input type="password" value={password} onChange={this.onPasswordChange} />
        </label>
        <button onClick={this.handleSubmit}>Log In</button>
      </div>
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
)(Login);
