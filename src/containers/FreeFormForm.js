import React, { PropTypes, Component } from 'react';

class FreeFormForm extends Component {

  static propTypes = {
    question: PropTypes.object,
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  render() {
    console.log("Free Form Form rendered!");
    console.log(this.state);

    const { onChange, value, question: { text } } = this.props;
    return (
      <div className="question">
        <h1>Free Form {text}</h1>
        <input
          type="text"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default FreeFormForm;
