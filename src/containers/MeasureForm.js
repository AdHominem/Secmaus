import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactQuill from 'react-quill';
import { Typeahead } from 'react-typeahead';
import { Parse } from 'parse';
import Alert from 'react-s-alert';

import '../styles/quill.css';
import * as actions from '../actions/measuresActions';

class MeasureForm extends Component {
  static propTypes = {
    saveMeasure: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired
  };

  state = {
    description: this.props.description,
    name: this.props.name,
    option: null,
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

    query.get(this.state.option.id, {
      success: measure => {
        this.setState({
          name: measure.get("name"),
          description: measure.get("description")
        })
      },
      error: error => {
        Alert.error('Zu importierende Maßnahme konnte nicht gefunden werden');
      }
    });
    
    event.preventDefault();
  };

  render() {
    return (
      <form className="editor-form">
        <div className="editor-form--header">
          <label>
            Vorlage:
            <div className="search-form">
              <Typeahead
                options={this.props.catalogMeasures}
                filterOption="name"
                displayOption="name"
                onOptionSelected={this.handleOnOptionSelected}
              />
              <button
                disabled={this.state.option === null}
                onClick={this.handleImport}
              >Benutzen</button>
            </div>
          </label>
          <label>
            Name:
            <input type="text" ref="name" value={this.state.name} onChange={this.onNameChange} />
          </label>
        </div>
        <ReactQuill
          value={this.state.description}
          onChange={this.onDescriptionChange}
          theme="snow"
        />
        <div className="button-row">
          <button className="button-danger" onClick={this.handleClose}>Abbrechen</button>
          <button className="button-success" onClick={this.handleSubmit}>OK</button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    catalogMeasures: state.catalogReducer.measures
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
