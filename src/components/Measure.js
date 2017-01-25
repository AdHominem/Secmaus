import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import MeasureForm from './MeasureForm';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';
import { browserHistory } from 'react-router';
import { Parse } from 'parse';
import Comments from '../containers/Comments';
import Polls from '../containers/Polls';
import NewPoll from '../containers/NewPoll';

class Measure extends React.Component {
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
    const { measureActions, commentsActions, pollsActions, measure } = this.props;
    const { deleteMeasure } = measureActions;

    const handleDeleteMeasure = event => {
      deleteMeasure(measure.id);
      browserHistory.push('/measures');
      event.preventDefault();
    };

    const saveMeasure = (name, description) => {
      measureActions.editMeasure(measure.id, name, description);
    };

    const onClick = event => {
      this.setState({ modalIsOpen: !this.state.modalIsOpen });
      event.preventDefault();
    };

    if (measure) {
      return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={0}
        transitionLeaveTimeout={0}
        transitionAppear={true}
        transitionAppearTimeout={3000}>

        <div className="measure">
          <h1>
            {measure.name}
            &nbsp;

            {Parse.User.current() && measure.createdBy.id === Parse.User.current().id &&
             <a onClick={onClick} ><FontAwesome name="edit"/></a>}
            &nbsp;
            {Parse.User.current() && measure.createdBy.id === Parse.User.current().id &&
             <a onClick={handleDeleteMeasure}><FontAwesome name="trash"/></a>}
          </h1>
          <p dangerouslySetInnerHTML={{__html: measure.description}}></p>
          <Comments commentsActions={commentsActions} parentId={measure.id}/>
          <Polls measureId={ measure.id } pollsActions={ pollsActions }/>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Maßnahme bearbeiten"
        >
          <MeasureForm
            saveMeasure={
              (name, description) => {
                saveMeasure(name, description);
                this.closeModal();
              }
            }
            name={measure.name}
            description={measure.description}
            close={this.closeModal}
          />
        </Modal>
        </div>

      </ReactCSSTransitionGroup>
      );
    }

    return (
      // TODO: 404
      <h1>Keine Maßnahme mit dieser ID gefunden</h1>
    );
  }
}

export default Measure;
