import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as measureActions from '../actions/measuresActions';
import * as commentActions from '../actions/commentsActions';
import * as userActions from '../actions/userActions';
import * as pollsActions from '../actions/pollsActions';
import * as catalogActions from '../actions/catalogActions';
import * as questionActions from '../actions/questionsActions';
import App from '../components/App';

function mapStateToProps(state) {
  return {
    measures: state.measuresReducer.measures
  };
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
)(App);
