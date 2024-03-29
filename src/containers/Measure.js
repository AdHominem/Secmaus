import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { find, propEq, isNil, T } from 'ramda';

import MeasureForm from './MeasureForm';
import Comments from './Comments';
import Polls from '../presentational/Polls';
import IconButtonRow from '../presentational/IconButtonRow';
import * as measuresActions from '../actions/measuresActions';
import * as commentsActions from '../actions/commentsActions';
import * as pollsActions from '../actions/pollsActions';

class Measure extends React.Component {

  static propTypes = {
    measureActions: PropTypes.object.isRequired,
    commentsActions: PropTypes.object.isRequired,
    measure: PropTypes.object,
    isAdmin: PropTypes.bool.isRequired
  };

  state = {modalIsOpen: false};

  openModal = () => { this.setState({ modalIsOpen: true }); };

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
    if (isNil(this.props.measure)) {
      return <p>Maßnahme wurde noch nicht geladen</p>;
    }

    const { measure, measure: { name, description, id }, isAdmin }  = this.props;
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
            {
              isAdmin &&
              <IconButtonRow buttons={[
                {icon: "edit", onClick: this.onClick},
                {icon: "trash", onClick: this.handleDeleteMeasure},
              ]} />
            }
          </h1>
          <p dangerouslySetInnerHTML={{__html: description}}/>

          <h2>Kommentare</h2>
          <Comments commentsActions={commentsActions} parentId={id}/>

          <h2>Umfragen</h2>
          <Polls measureId={id} showButtons={true} />

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={T}
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
            edit={true}
          />
        </Modal>
        </div>
      );
    }

    return (
      <h1>Keine Maßnahme mit dieser ID gefunden</h1>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    measure: find(propEq('id', ownProps.params.measureId), state.measures),
    comments: state.comments,
    isAdmin: state.isAdmin
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
