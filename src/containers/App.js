import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as measureActions from '../actions/measuresActions';
import * as commentActions from '../actions/commentsActions';
import App from '../components/App';

function mapStateToProps(state) {
  return {
    measures: state.measuresReducer.measures
  };
}

function mapDispatchToProps(dispatch) {
  return {
    measureActions: bindActionCreators(measureActions, dispatch),
    commentActions: bindActionCreators(commentActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
