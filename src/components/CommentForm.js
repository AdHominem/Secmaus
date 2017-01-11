import React, { PropTypes } from 'react';
import ReactQuill from 'react-quill';
import '../styles/quill.css';

class CommentForm extends React.Component {
  static propTypes = {
    saveComment: PropTypes.func.isRequired,
    parentID: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { text: props.text };

    this.onTextChange = this.onTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onTextChange(value) {
    this.setState({ text: value });
  }

  handleSubmit(event) {
    const { saveComment } = this.props;
    saveComment(this.state.text, this.props.parentID);
    this.setState({ text: '' });
    event.preventDefault();
  }

  render() {
    const { close } = this.props;
    return (
      <form className="editor-form">
        <ReactQuill
          value={this.state.text}
          onChange={this.onTextChange}
          theme="snow"
        />
        <div className="button-row">
          <a className="btn btn-danger" onClick={(event) => {event.preventDefault; close()}}>
            Schließen
          </a>
          <input type="submit" className="btn btn-primary" onClick={this.handleSubmit}/>
        </div>
      </form>
    );
  }
}

export default CommentForm;
