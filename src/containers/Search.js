import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import Parse from 'parse';
import Alert from 'react-s-alert';

import Measures from '../containers/Measures';
import AllPolls from '../presentational/AllPolls';

class Search extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired
  };

  state = {
    measures: [],
    polls: [],
    doneLoadingMeasures: false,
    doneLoadingPolls: false,
  };

  componentDidMount() {
    this.loadResults(this.props.params.keyword);
  }

  componentWillReceiveProps(nextProps) {
    this.loadResults(nextProps.params.keyword);
  }

  loadResults(keyword) {
    this.setState({doneLoadingPolls: false, doneLoadingMeasures: false});

    const Measure = Parse.Object.extend("Measure");
    const query1 = new Parse.Query(Measure);
    // Case sensitive
    // query1.contains("description", keyword) || query1.contains("name", keyword);
    // Case insensitive:
    query1.matches("description", keyword, "i") || query1.matches("name", keyword, "i");

    query1.find().then(
      results => {
        const measures = results.map(result => ({
          id: result.id,
          name: result.get("name"),
          description: result.get("description"),
          createdBy: result.get("createdBy"),
        }));
        this.setState({measures: measures, doneLoadingMeasures: true});
      }
    ).catch(
      () => Alert.error('Suche fehlgeschlagen')
    );

    const Poll = Parse.Object.extend("Poll");
    const query2 = new Parse.Query(Poll);
    // Case sensitive
    // query2.contains("text", keyword);
    // Case insensitive:
    query2.matches("text", keyword, "i");

    query2.find().then(
      results => {
        const polls = results.map(result => ({
          id: result.id,
          measureId: result.get("measureId"),
          text: result.get("text"),
          closed: result.get("closed"),
        }));
        this.setState({polls: polls, doneLoadingPolls: true});
      }
    ).catch(
      () => Alert.error('Suche fehlgeschlagen')
    );
  }

  render() {
    const keyword = this.props.params.keyword;
    const { measures, polls, doneLoadingMeasures, doneLoadingPolls } = this.state;

    if (doneLoadingPolls && doneLoadingMeasures) {
      return (
        <div>
          { measures.length + polls.length > 0 ?
            <h1>Ergebnisse für "{keyword}"</h1> :
            <h1>Keine Ergebnisse für "{keyword}"</h1> }
          { measures.length > 0 &&
            <div>
              <h2>Maßnahmen</h2>
              <Measures measures={measures} showButtons={false} />
            </div> }
          { polls.length > 0 && <AllPolls polls={polls}/> }
        </div>
      );
    } else {
      return (
        <div>
          <h1>Suche nach "{keyword}"...</h1>
        </div>
      );
    }
  }
}

function mapStateToProps() {
  return {};
}
function mapDispatchToProps() { return { }; }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
