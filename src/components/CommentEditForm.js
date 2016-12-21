import React, { PropTypes } from 'react';
import ReactQuill from 'react-quill';
import '../styles/quill.css';

class CommentEditForm extends React.Component {
  static propTypes = {
    editComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    toggleEdit: PropTypes.func.isRequired
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
    const { editComment, comment } = this.props;
    editComment(comment.id, this.state.text);
    this.setState({ text: '' });
    this.props.toggleEdit();
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

export default CommentEditForm;
