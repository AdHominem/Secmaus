import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Polls from '../containers/Polls';
import Modal from 'react-modal';
import MeasureForm from '../containers/MeasureForm';

class Measures extends React.Component {
  constructor() {
    super();
    this.state = { modalIsOpen: false };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() { this.setState({ modalIsOpen: true }); }
  afterOpenModal() { }
  closeModal() { this.setState({ modalIsOpen: false }); }

  render() {
    const { measures, measureActions } = this.props;
    const { saveMeasure } = measureActions;

    const body = measures.map((measure, i) =>
      <Link key={i} className="flex-box" to={`/SIDATESecMaus/measure/${measure.id}`}>
        <h1 className="flex-title">{measure.name}</h1>
      </Link>
    );

    const onClick = event => {
      this.setState({ modalIsOpen: !this.state.modalIsOpen });
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
        <a className="btn btn-primary" onClick={onClick} >Neue Maßnahme</a>
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
      </div>
    );
  }
}


export default Measures;
