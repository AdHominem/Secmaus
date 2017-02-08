import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/measuresActions';

class Catalog extends React.Component {
  render() {
    const { measures, measureActions } = this.props;
    const { addMeasureFromCatalog } = measureActions;
    
    return (
      <div>
        <h1>Maßnahmenkatalog</h1>
        <ul>
        {
          measures.map((measure, i) =>
            <li key={i}>
              <a onClick={event => {
                addMeasureFromCatalog(measure.id);
                event.preventDefault();
              }}>
                {measure.name}
              </a>
            </li>
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
    measureActions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog);
