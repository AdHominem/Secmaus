import React from 'react';
// import { Link } from 'react-router';
import { Parse } from 'parse';
import MeasureForm from './MeasureForm';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {results: []};
  }

  componentDidMount() {
    const self = this;
    const Measure = Parse.Object.extend("Measure");
    const query = new Parse.Query(Measure);

    query.find({
      success: function (results) {
        console.log(results);
        self.setState({results: results});
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  render() {
    const results = this.state.results;
    const body = results.map((object, i) => <li key={i}>{object.get("name")}</li>);
    return (
      <div>
        <ul>
          {body}
        </ul>
        <MeasureForm/>
      </div>    
    );
  }
}

export default HomePage;
