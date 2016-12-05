import React from 'react';
import { Parse } from 'parse';
import { Jumbotron } from 'react-bootstrap';

class MeasureForm extends React.Component {
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

    const Measure = Parse.Object.extend("Measure");
    const measure = new Measure();

    measure.set("name", this.state.name);
    measure.set("description", this.state.description);

    measure.save(null, {
      success: function() {
        alert('Maßnahme erfolgreich angelegt');
      },
      error: function(measure, error) {
        alert('Maßnahme konnte nicht angelegt werden: ' + error.message);
      }
    });
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
