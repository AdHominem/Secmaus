import React, { PropTypes } from 'react';
import ReactQuill from 'react-quill';
import '../styles/quill.css';
// import RichTextEditor from 'react-rte';


class MeasureForm extends React.Component {
  static propTypes = {
    saveMeasure: PropTypes.func.isRequired
  }

  render() {
    const handleSubmit = (event) => {
      event.preventDefault();
      const { saveMeasure } = this.props;
      saveMeasure(this.refs.name.value, this.refs.description.value);
      this.refs.name.value = '';
      this.refs.description.value = '';
    };

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
          ref="description"
          defaultValue={this.props.description}
          theme="snow"
        />
        <input type="submit" onClick={handleSubmit}/>
      </form>    
    );
  }
}

export default MeasureForm;
