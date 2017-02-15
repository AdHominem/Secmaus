import React, { PropTypes } from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as actions from "../actions/measuresActions";

const catalogRequiredProps = {
  measures: PropTypes.object.isRequired,
  measureActions: PropTypes.object.isRequired
};

function Catalog(props) {
  const { measures, measureActions: { addMeasureFromCatalog} } = this.props;

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

Catalog.propTypes = catalogRequiredProps;

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
