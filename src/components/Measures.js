import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Polls from '../containers/Polls';
import Modal from 'react-modal';
import MeasureForm from '../components/MeasureForm';

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
      <Link key={i} className="measure" to={`/SIDATESecMaus/measure/${measure.id}`}>
        {measure.name}
      </Link>
    );

    const onClick = event => {
      this.setState({ modalIsOpen: !this.state.modalIsOpen });
      event.preventDefault();
    };

    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={0}
        transitionLeaveTimeout={0}
        transitionAppear={true}
        transitionAppearTimeout={3000}>
        <div className="measures-container">
          <a className="btn btn-primary" onClick={onClick} >Neue Maßnahme</a>
          <div className="measures">
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
              close={this.closeModal}
            />
          </Modal>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}


export default Measures;
