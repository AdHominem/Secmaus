import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as measuresActions from '../actions/measuresActions';
import * as commentsActions from '../actions/commentsActions';
import * as pollsActions from '../actions/pollsActions';

import Measure from '../components/Measure';
import { find, propEq } from 'ramda';

function mapStateToProps(state, ownProps) {
  return {
    measure: find(propEq('id', ownProps.params.measureId), state.measuresReducer.measures),
    comments: state.commentsReducer.comments,
    polls: state.pollsReducer.questions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    measureActions: bindActionCreators(measuresActions, dispatch),
    commentsActions: bindActionCreators(commentsActions, dispatch),
    pollsActions: bindActionCreators(pollsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Measure);
