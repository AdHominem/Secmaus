import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/measuresActions';
import Measure from '../components/Measure';
import { find, propEq } from 'ramda';

function mapStateToProps(state, ownProps) {
  return {
    measure: find(propEq('id', ownProps.params.measureId), state.measuresReducer.measures),
    comments: state.commentsReducer.comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    measureActions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Measure);
