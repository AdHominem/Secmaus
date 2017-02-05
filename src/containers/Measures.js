import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/measuresActions';
import Measures from '../components/Measures';

function mapStateToProps(state, ownProps) {
  return {
    measures: ownProps.measures || state.measuresReducer.measures,
    showButtons: ownProps.showButtons !== false,
    isAdmin: state.userReducer.isAdmin
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
)(Measures);
