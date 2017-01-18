import React, { Component } from 'react';
import Send from '../node_modules/react-icons/lib/md/send';

//var Button = require('react-foundation').Button;
var Row = require('react-foundation').Row;
var Column = require('react-foundation').Column;
var Sizes = require('react-foundation').Sizes;
var Button = require('react-foundation').Button;
var $ = require('jquery');

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="grid_form_request">
       <form onSubmit={this.handleSubmit}>
        <Row className="search">
          <Column small={10} large={8}>
             Dato: <input type="text"/>
          </Column>
        </Row>
        <Row className="search">
          <Column small={5} large={6}>
            <label>Escoger un dia determinado (por defecto: esta noche)</label>
              <input type="Date"/>
          </Column>
          <Column small={5} large={3}>
              <label>Numero de coincidencias</label>
              <input type="number"/>
          </Column>
          <Column small={2} large={3}>
             <Button type="submit"><Send size={Sizes.small} /></Button>
          </Column>
        </Row>
       </form>
      </div>
    );
  }
}

export default NameForm;