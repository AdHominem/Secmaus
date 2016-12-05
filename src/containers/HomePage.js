import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/measuresActions';
import HomePage from '../components/HomePage';

function mapStateToProps(state) {
  return {
    measures: state.measuresReducer.measures
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
