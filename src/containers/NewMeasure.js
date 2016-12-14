import React, { PropTypes } from 'react';
import MeasureForm from '../components/MeasureForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/measuresActions';

class NewMeasure extends React.Component {
  static propTypes = {
    measureActions: PropTypes.object.isRequired
  };

  render() {
    const { measureActions } = this.props;
    return (
      <div className="measures--form">
        <h2>Maßname hinzufügen</h2>
        <MeasureForm saveMeasure={measureActions.saveMeasure} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    measureActions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMeasure);
