import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/commentsActions';
import Comment from '../components/Comment';

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
