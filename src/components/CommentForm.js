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
    return (
      <form>
        <ReactQuill
          value={this.state.text}
          onChange={this.onTextChange}
          theme="snow"
        />
        <input type="submit" onClick={this.handleSubmit}/>
      </form>
    );
  }
}

export default CommentForm;
