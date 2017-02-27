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
    measureActions: PropTypes.object,
    commentActions: PropTypes.object,
    userActions: PropTypes.object,
    pollsActions: PropTypes.object,
    catalogActions: PropTypes.object,
    questionActions: PropTypes.object
  };

  handleSubmit = (event) => {
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

  render() {
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
