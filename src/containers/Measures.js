import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Modal from 'react-modal';
import { sortBy, prop, reverse } from 'ramda';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MeasureForm from './MeasureForm';
import ImportMeasureForm from './ImportMeasureForm';
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
    modalIsOpen2: false
  };

  openModal = () => { this.setState({ modalIsOpen: true }); };

  afterOpenModal = () => { };

  closeModal = () => { this.setState({ modalIsOpen: false }); };

  openModal2 = () => { this.setState({ modalIsOpen2: true }); };

  afterOpenModal2 = () => { };

  closeModal2 = () => { this.setState({ modalIsOpen2: false }); };

  newMeasure = event => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
    event.preventDefault();
  };

  importMeasure = event => {
    this.setState({ modalIsOpen2: !this.state.modalIsOpen2 });
    event.preventDefault();
  };

  render() {
    const { measures, measureActions: { addMeasureFromCatalog, saveMeasure }, showButtons, isAdmin } = this.props;

    const body = measures.map((measure, i) =>
      <Link key={i} className="flex-box" to={`/SIDATESecMaus/measure/${measure.id}`}>
        <h1 className="flex-title">{measure.name}</h1>
      </Link>
    );

    // <ReactCSSTransitionGroup
    //   transitionName="example"
    //   transitionEnterTimeout={0}
    //   transitionLeaveTimeout={0}
    //   transitionAppear={true}
    //   transitionAppearTimeout={3000}>
    // </ReactCSSTransitionGroup>
    return (
      <div className="measures-container">
        {
          showButtons === undefined && isAdmin &&
          <p>
            <button className="btn btn-primary" onClick={this.newMeasure} >Neue Maßnahme</button> <button className="btn btn-primary" onClick={this.importMeasure} >Maßnahme importieren</button>
          </p>
        }
        <div className="flex-boxes">
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
        <Modal
          isOpen={this.state.modalIsOpen2}
          onAfterOpen={this.afterOpenModal2}
          onRequestClose={this.closeModal2}
          contentLabel="Maßnahme importieren"
        >
          <ImportMeasureForm
            importMeasure={
              (id) => {
                addMeasureFromCatalog(id);
                this.closeModal2();
              }
            }
            close={this.closeModal2}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const measures = ownProps.measures || state.measuresReducer.measures;
  return {
    measures: reverse(sortBy(prop('createdAt'), measures)),
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
