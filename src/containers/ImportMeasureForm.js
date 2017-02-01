import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Autocomplete from 'react-autocomplete';
import * as actions from '../actions/measuresActions';

class MeasureForm extends React.Component {
  static propTypes = {
    saveMeasure: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      search_text: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { importMeasure } = this.props;
    importMeasure(this.state.item.id);
    this.setState({ description: '', name: '' });
    event.preventDefault();
  }

  render() {
    const { close, catalogMeasures } = this.props;

    const matchItemToValue = (item, value) => {
      return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    };

    return (
      <form className="editor-form">
        <div className="editor-form--header">
          <label>
            Import:
            <div className="search-form">
              <Autocomplete
                value={this.state.search_text}
                onChange={(event, value) => this.setState({ search_text: value })}
                onSelect={(value, item) => this.setState({ search_text: value, item: item })}
                shouldItemRender={matchItemToValue}
                items={catalogMeasures}
                getItemValue={item => item.name}
                renderItem={(item, isHighlighted) => (
                  <div className="search-item">{item.name}</div>
                )}
              />
            </div>
          </label>
          <a className="btn btn-danger" onClick={(event) => {event.preventDefault; close();}}>
            Schließen
          </a>
          <input type="submit" className="btn btn-primary" onClick={this.handleSubmit}/>
        </div>
        <div className="button-row">
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    catalogMeasures: state.catalogReducer.measures
  };
}

function mapDispatchToProps(dispatch) {
  return {
    measureActions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeasureForm);
