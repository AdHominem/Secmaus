import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactQuill from 'react-quill';
import Autocomplete from 'react-autocomplete';
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
    this.state = { text: props.description, search_text: '' };

    this.onTextChange = this.onTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onTextChange(value) {
    this.setState({ text: value });
  }

  handleSubmit(event) {
    const { saveMeasure } = this.props;
    saveMeasure(this.refs.name.value, this.state.text);
    this.refs.name.value = '';
    this.setState({ text: '' });
    event.preventDefault();
  }



  render() {
    const { close, catalogMeasures } = this.props;

    const matchItemToValue = (item, value) => {
      return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    };

    return (
      <form className="editor-form">
        <div className="editor-form--header">
          <label>
            Import:
            <div className="search-form">
              <Autocomplete
                value={this.state.search_text}
                onChange={(event, value) => this.setState({ search_text: value })}
                onSelect={value => this.setState({ search_text: value })}
                shouldItemRender={matchItemToValue}
                items={catalogMeasures}
                getItemValue={item => item.name}
                renderItem={(item, isHighlighted) => (
                  <div className="search-item">{item.name}</div>
                )}
              />
            </div>
          </label>
          <label>
            Name:
            <input type="text" ref="name" defaultValue={this.props.name} />
          </label>
        </div>
        <ReactQuill
          value={this.state.text}
          onChange={this.onTextChange}
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
