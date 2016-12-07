import React, { PropTypes } from 'react';

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
        <label>
          Description:
          <input type="text" ref="description" defaultValue={this.props.description} />
        </label>
        <input type="submit" onClick={handleSubmit}/>
      </form>    
    );
  }
}

export default MeasureForm;
