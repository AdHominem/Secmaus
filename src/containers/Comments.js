import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/commentsActions';
import Comments from '../components/Comments';

function mapStateToProps(state) {
  return {
    comments: state.commentsReducer.comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
