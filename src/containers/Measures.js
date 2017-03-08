import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Modal from 'react-modal';
import { sortBy, prop, reverse } from 'ramda';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FontAwesome from 'react-fontawesome';

import MeasureForm from './MeasureForm';
import * as actions from '../actions/measuresActions';

class Measures extends Component {

  static propTypes = {
    isAdmin: PropTypes.bool,
    measures: PropTypes.array.isRequired,
    measureActions: PropTypes.object.isRequired,
    showButtons: PropTypes.bool
  };

  state = {
    modalIsOpen: false,
  };

  openModal = () => { this.setState({ modalIsOpen: true }); };
  closeModal = () => { this.setState({ modalIsOpen: false }); };
  afterOpenModal = () => { };

  newMeasure = event => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
    event.preventDefault();
  };


  render() {
    const { measures, measureActions: { saveMeasure }, showButtons, isAdmin } = this.props;

    const body = measures.map((measure, i) =>
      <Link key={i} className="flex-box" to={`/SIDATESecMaus/measure/${measure.id}`}>
        <h1 className="flex-title">{measure.name}</h1>
      </Link>
    );

    return (
      <div className="measures-container">

        <div className="flex-boxes">
          {
            showButtons === undefined && isAdmin &&
            <Link className="flex-box" onClick={this.newMeasure}>
              <FontAwesome className="add-measure" name="plus" size="3x"/>
            </Link>
          }
            {body}
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Maßnahme hinzufügen"
        >
          <MeasureForm
            saveMeasure={
              (name, description) => {
                saveMeasure(name, description);
                this.closeModal();
              }
            }
            name=""
            description=""
            close={this.closeModal}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const measures = ownProps.measures || state.measures;
  return {
    measures: reverse(sortBy(prop('createdAt'), measures)),
    isAdmin: state.isAdmin
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
