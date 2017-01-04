import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as measureActions from '../actions/measuresActions';
import * as commentActions from '../actions/commentsActions';
import * as userActions from '../actions/userActions';
import Login from '../components/Login';

function mapStateToProps(state) {
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
)(Login);
