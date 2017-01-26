import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/pollsActions';

class Catalog extends React.Component {
  render() {
    const { measures } = this.props;
    return (
      <div>
        <h1>Maßnahmenkatalog</h1>
        <ul>
        {
          measures.map((measure, i) =>
            <li key={i}>{measure.name}</li>
          )
        }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    measures: state.catalogReducer.measures
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // pollsActions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog);
