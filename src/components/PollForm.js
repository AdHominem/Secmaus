import React, { PropTypes } from 'react';
import ReactQuill from 'react-quill';
import '../styles/quill.css';

class PollForm extends React.Component {
  static propTypes = {
    savePoll: PropTypes.func.isRequired
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
    const { savePoll } = this.props;
    savePoll(this.refs.name.value, this.state.text);
    this.refs.name.value = '';
    this.setState({ text: '' });
    event.preventDefault();
  }

  render() {
    return (
      <form>
        <label>
          Name:
          <input type="text" ref="name" defaultValue={this.props.name} />
        </label>
        <br/>
        <label>
          Description:
        </label>
        <ReactQuill
          value={this.state.text}
          onChange={this.onTextChange}
          theme="snow"
        />
        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

export default PollForm;
