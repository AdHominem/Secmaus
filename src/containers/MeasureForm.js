import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactQuill from 'react-quill';
import { Typeahead } from 'react-typeahead';
import { Parse } from 'parse';
import Alert from 'react-s-alert';

import ButtonRow from '../presentational/ButtonRow';
import * as actions from '../actions/measuresActions';
import '../styles/quill.css';

class MeasureForm extends Component {
  static propTypes = {
    saveMeasure: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    catalogMeasures: PropTypes.array.isRequired,
    edit: PropTypes.bool
  };

  state = {
    description: this.props.description,
    name: this.props.name,
    option: null
  };

  onDescriptionChange = (value) => {
    this.setState({ description: value });
  };

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = (event) => {
    const { saveMeasure } = this.props;
    saveMeasure(this.state.name, this.state.description);
    this.setState({ description: '', name: '' });
    event.preventDefault();
  };

  handleClose = (event) => {
    const {close} = this.props;
    close();
    event.preventDefault();
  };

  handleOnOptionSelected = (option) => {
    this.setState({ option: option });
  };

  handleImport = (event) => {
    const CatalogMeasure = Parse.Object.extend("CatalogMeasure");
    const query = new Parse.Query(CatalogMeasure);

    query.get(this.state.option.id).then(
      measure => this.setState({
        name: measure.get("name"),
        description: measure.get("description")
      })
    ).catch(
      () => Alert.error('Zu importierende Maßnahme konnte nicht gefunden werden')
    );

    event.preventDefault();
  };

  render() {
    const { edit, catalogMeasures } = this.props;
    const { option, name, description } = this.state;

    return (
      <form className="editor-form">
        <div className="editor-form--header">

          { !edit && <label>
            Vorlage:
            <div className="search-form">
              <Typeahead
                options={catalogMeasures}
                filterOption="name"
                displayOption="name"
                onOptionSelected={this.handleOnOptionSelected}
              />
              <button
                disabled={option === null}
                onClick={this.handleImport}
              >Benutzen</button>
            </div>
          </label> }

          <label>
            Name:
            <input type="text" ref="name" value={name} onChange={this.onNameChange} />
          </label>
        </div>
        <ReactQuill
          value={description}
          onChange={this.onDescriptionChange}
          theme="snow"
        />
        <div/>
        <ButtonRow onClose={this.handleClose} onSubmit={this.handleSubmit} disableSubmit={ !name || !description } />
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    catalogMeasures: state.catalog
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
)(MeasureForm);
