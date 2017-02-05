import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Parse from 'parse';
import { uniq, update, any, clone, append } from 'ramda';
import Alert from 'react-s-alert';
import Measures from '../containers/Measures'
import Poll from '../containers/Poll'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measures: [],
      polls: [],
    };
  }

  componentDidMount() {
    const keyword = this.props.params.keyword;

    const Measure = Parse.Object.extend("Measure");
    const query1 = new Parse.Query(Measure);
    // Case sensitive
    // query1.contains("description", keyword) || query1.contains("name", keyword);
    // Case insensitive:
    query1.matches("description", keyword, "i") || query1.matches("name", keyword, "i");

    query1.find(
      {
        success: results => {
          const measures = results.map(result => ({
            id: result.id,
            name: result.get("name"),
            description: result.get("description"),
            createdBy: result.get("createdBy"),
          }));
          this.setState({measures: measures});
        },
        error: error => {
          Alert.error('Suche fehlgeschlagen: ' + error);
        }
      }    
    );

    const Poll = Parse.Object.extend("Poll");
    const query2 = new Parse.Query(Poll);
    // Case sensitive
    // query2.contains("text", keyword);
    // Case insensitive:
    query2.matches("text", keyword, "i");

    query2.find(
      {
        success: results => {
          const polls = results.map(result => ({
            id: result.id,
            measureId: result.get("measureId"),
            text: result.get("text"),
            closed: result.get("closed"),
          }));
          this.setState({polls: polls});
        },
        error: error => {
          Alert.error('Suche fehlgeschlagen: ' + error);
        }
      }    
    );
  }

  render() {
    const keyword = this.props.params.keyword;
    const { measures, polls } = this.state;

    return (
      <div>
        <h1>Suche nach "{keyword}"</h1>
        <h2>Maßnahmen</h2>
        <Measures measures={measures} showButtons={false} />
        <h2>Umfragen</h2>
        <div className="flex-boxes">
          {polls.map(poll => <Poll poll={ poll } />)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) { return { }; }
function mapDispatchToProps(dispatch) { return { }; }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
