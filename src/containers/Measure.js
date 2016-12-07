import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/measuresActions';
import Measure from '../components/Measure';

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
)(Measure);
