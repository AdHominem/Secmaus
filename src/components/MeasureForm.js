import React, { PropTypes } from 'react';
import { Jumbotron } from 'react-bootstrap';

class MeasureForm extends React.Component {
  static propTypes = {
    saveMeasure: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.state = {
      name: '',
      description: ''
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleDescriptionChange(event) {
    this.setState({description: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { saveMeasure } = this.props;
    saveMeasure(this.state.name, this.state.description);
    this.setState({description: '', name: ''});
  }

  render() {
    return (
      <Jumbotron>
        <h2>Maßname hinzufügen</h2>
        <form>
          <label>
            Name:
            <input type="text" value={this.state.name} onChange={this.handleNameChange} />
          </label>
          <label>
            Description:
            <input type="text" value={this.state.description} onChange={this.handleDescriptionChange}/>
          </label>
          <input type="submit" onClick={this.handleSubmit}/>
        </form>    
      </Jumbotron>
    );
  }
}

export default MeasureForm;
