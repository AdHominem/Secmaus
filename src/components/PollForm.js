import React, { PropTypes } from 'react';
import ReactQuill from 'react-quill';
import '../styles/quill.css';
import * as actions from '../actions/pollsActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class PollForm extends React.Component {
  static propTypes = {
    savePoll: PropTypes.func.isRequired,
    measureId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.description,
      answers: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeHandler(event) {
    console.log(event.target.value);
  }

  handleSubmit(event) {
    const { savePoll } = this.props;
    //savePoll(this.refs.name.value, this.state.text);
    this.refs.name.value = '';
    this.setState({ text: '' });
    event.preventDefault();
  }

  render() {
    return (
      <form>

        <label>
          Name:
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

       <select defaultValue={3} name="answer_dropdown" size="1" onChange={ this.onChangeHandler }>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>

        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

export default PollForm;
