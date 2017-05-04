import React, { Component } from 'react';
import Send from '../../node_modules/react-icons/lib/md/send';

//var Button = require('react-foundation').Button;
var Row = require('react-foundation').Row;
var Column = require('react-foundation').Column;
var Sizes = require('react-foundation').Sizes;
var Button = require('react-foundation').Button;
var tr = require('../../translate.js');

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.props = props
    this.solicitaDatos = props.solicitaDatos;
    this.thisPrincipal = props.that;
    //this.handleChange.bind(this, props.Change);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    var urlpath = "/api/form";
    var data = {}
    data.search = this.refs.search.value;
    data.num= this.refs.number.value;    
    this.solicitaDatos(data, "", urlpath, this.thisPrincipal);
  }

  render() {
    return (
      <div className="grid_form_request">
       <form onSubmit={this.handleSubmit}>
        <Row className="search">
          <Column small={10} large={8}>
            <label>search:</label> <input placeholder= {"introduce la busqueda"} onChange={this.props.Change} ref="search" type="text"/>
          </Column>
        </Row>
        <Row className="search">
          <Column small={5} large={3}>
              <label>{"Numero de coincidencias"}</label>
              <input placeholder='3' ref="number" type="number"/>
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