import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as pollsActions from '../actions/pollsActions';
import * as questionsActions from '../actions/questionsActions';
import Parse from 'parse';
import { uniq, update, any, clone, append } from 'ramda';
import Alert from 'react-s-alert';
import Measures from '../containers/Measures'
import Polls from '../containers/Polls'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measures: [],
      polls: [],
      // catalog: [],
    };
  }

  componentDidMount() {
    const keyword = this.props.params.keyword;

    const Measure = Parse.Object.extend("Measure");
    const query1 = new Parse.Query(Measure);
    query1.contains("description", keyword) || query1.contains("name", keyword);

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
    query2.contains("text", keyword).select("measureId");

    query2.find(
      {
        success: results => {
          const polls = results.map(result => result.get("measureId"))
          console.log(results);
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
        { uniq(polls).map(measureId => 
          <Polls measureId={measureId} showButtons={false} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { };
}

function mapDispatchToProps(dispatch) {
  return { };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
