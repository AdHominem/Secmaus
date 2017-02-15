import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';
import { browserHistory } from 'react-router';
import { Parse } from 'parse';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { find, propEq } from 'ramda';

import MeasureForm from './MeasureForm';
import Comments from './Comments';
import Polls from './Polls';
import * as measuresActions from '../actions/measuresActions';
import * as commentsActions from '../actions/commentsActions';
import * as pollsActions from '../actions/pollsActions';

class Measure extends React.Component {
  static propTypes = {
    measureActions: PropTypes.object.isRequired,
    commentsActions: PropTypes.object.isRequired,
    measure: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {modalIsOpen: false};
  }

  openModal = () => { this.setState({ modalIsOpen: true }); };

  afterOpenModal = () => { };

  closeModal = () => { this.setState({ modalIsOpen: false }); };

  handleDeleteMeasure = (event) => {
    const { measureActions: { deleteMeasure }, measure: { id } } = this.props;
    deleteMeasure(id);
    browserHistory.push('/SIDATESecMaus/measures');
    event.preventDefault();
  };

  saveMeasure = (name, description) => {
    const { measureActions: { editMeasure }, measure: { id } } = this.props;
    editMeasure(id, name, description);
  };

  onClick = (event) => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
    event.preventDefault();
  };

  render() {
    const { measure, measure: { name, createdBy, description, id }, measureActions: { editMeasure } }  = this.props;
    if (measure) {
      // <ReactCSSTransitionGroup
      //   transitionName="example"
      //   transitionEnterTimeout={0}
      //   transitionLeaveTimeout={0}
      //   transitionAppear={true}
      //   transitionAppearTimeout={3000}>
      // </ReactCSSTransitionGroup>
      return (
        <div className="measure">
          <h1>
            {name}
            &nbsp;
            {Parse.User.current() && createdBy.id === Parse.User.current().id &&
             <a onClick={this.onClick} ><FontAwesome name="edit"/></a>}
            &nbsp;
            {Parse.User.current() && createdBy.id === Parse.User.current().id &&
             <a onClick={this.handleDeleteMeasure}><FontAwesome name="trash"/></a>}
          </h1>
          <p dangerouslySetInnerHTML={{__html: description}}/>

          <h2>Kommentare</h2>
          <Comments commentsActions={commentsActions} parentId={id}/>

          <h2>Umfragen</h2>
          <Polls measureId={id} showButtons={true} />

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Maßnahme bearbeiten"
        >
          <MeasureForm
            saveMeasure={
              (name, description) => {
                this.saveMeasure(name, description);
                this.closeModal();
              }
            }
            name={name}
            description={description}
            close={this.closeModal}
          />
        </Modal>
        </div>
      );
    }

    return (
      // TODO: 404
      <h1>Keine Maßnahme mit dieser ID gefunden</h1>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    measure: find(propEq('id', ownProps.params.measureId), state.measuresReducer.measures),
    comments: state.commentsReducer.comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pollsActions: bindActionCreators(pollsActions, dispatch),
    measureActions: bindActionCreators(measuresActions, dispatch),
    commentsActions: bindActionCreators(commentsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Measure);
