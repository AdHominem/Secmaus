import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactQuill from 'react-quill';
import * as actions from '../actions/measuresActions';
import '../styles/quill.css';

class MeasureForm extends React.Component {
  static propTypes = {
    saveMeasure: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      description: props.description,
      name: props.name,
    };

    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onDescriptionChange(value) {
    this.setState({ description: value });
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    const { saveMeasure } = this.props;
    saveMeasure(this.state.name, this.state.description);
    this.setState({ description: '', name: '' });
    event.preventDefault();
  }

  render() {
    const { close, catalogMeasures } = this.props;

    return (
      <form className="editor-form">
        <div className="editor-form--header">
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
          <a className="btn btn-danger" onClick={(event) => {event.preventDefault; close();}}>
            Schließen
          </a>
          <input type="submit" className="btn btn-primary" onClick={this.handleSubmit}/>
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
