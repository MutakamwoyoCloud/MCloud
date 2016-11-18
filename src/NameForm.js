import React, { Component } from 'react';
import {Icon} from 'react-fa'

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Dato:
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <button type="submit">
        <Icon paper-plane name="paper-plane" />
        </button>
        
      </form>
    );
  }
}

export default NameForm;