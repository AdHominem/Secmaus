import React, { PropTypes } from 'react';
import ReactQuill from 'react-quill';

import '../styles/quill.css';

class CommentForm extends React.Component {
  static propTypes = {
    saveComment: PropTypes.func.isRequired,
    parentID: PropTypes.string.isRequired,
    text: PropTypes.string,
    close: PropTypes.func.isRequired
  };

  state = { text: this.props.text };

  onTextChange = (value) => {
    this.setState({ text: value });
  };

  handleSubmit = (event) => {
    const { saveComment } = this.props;
    saveComment(this.state.text, this.props.parentID);
    this.setState({ text: '' });
    event.preventDefault();
  };

  handleClose = (event) => {
    const {close} = this.props;
    close();
    event.preventDefault();
  };

  render() {
    return (
      <div className="editor-form">
        <ReactQuill
          value={this.state.text}
          onChange={this.onTextChange}
          theme="snow"
        />
        <div className="button-row">
          <button className="button-danger" onClick={this.handleClose}>Abbrechen</button>
          <button className="button-success" onClick={this.handleSubmit}>OK</button>
        </div>
      </div>
    );
  }
}

export default CommentForm;
