import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Polls from '../containers/Polls';
import Modal from 'react-modal';
import MeasureForm from '../containers/MeasureForm';
import ImportMeasureForm from '../containers/ImportMeasureForm';
import { reverse } from 'ramda';

class Measures extends React.Component {
  constructor() {
    super();
    this.state = { modalIsOpen: false, modalIsOpen2: false };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.openModal2 = this.openModal2.bind(this);
    this.afterOpenModal2 = this.afterOpenModal2.bind(this);
    this.closeModal2 = this.closeModal2.bind(this);
  }

  openModal() { this.setState({ modalIsOpen: true }); }
  afterOpenModal() { }
  closeModal() { this.setState({ modalIsOpen: false }); }

  openModal2() { this.setState({ modalIsOpen2: true }); }
  afterOpenModal2() { }
  closeModal2() { this.setState({ modalIsOpen2: false }); }

  render() {
    const { measures, measureActions, showButtons } = this.props;
    const { addMeasureFromCatalog, saveMeasure } = measureActions;

    const body = reverse(measures).map((measure, i) =>
      <Link key={i} className="flex-box" to={`/SIDATESecMaus/measure/${measure.id}`}>
        <h1 className="flex-title">{measure.name}</h1>
      </Link>
    );

    const onClick = event => {
      this.setState({ modalIsOpen: !this.state.modalIsOpen });
      event.preventDefault();
    };

    const onClick2 = event => {
      this.setState({ modalIsOpen2: !this.state.modalIsOpen2 });
      event.preventDefault();
    };

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
          showButtons === undefined && this.props.isAdmin &&
          <p>
            <a className="btn btn-primary" onClick={onClick} >Neue Maßnahme</a> / <a className="btn btn-primary" onClick={onClick2} >Maßnahme importieren</a>
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


export default Measures;
