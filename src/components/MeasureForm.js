import React, { PropTypes } from 'react';
import ReactQuill from 'react-quill';
import '../styles/quill.css';

class MeasureForm extends React.Component {
  static propTypes = {
    saveMeasure: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { text: props.description };

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
    const { close } = this.props;
    return (
      <form className="editor-form">
        <div className="editor-form--header">
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

export default MeasureForm;
