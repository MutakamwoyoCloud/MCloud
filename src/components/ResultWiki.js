import React, { Component } from 'react';
var Row = require('react-foundation').Row;

require('react-foundation');

export default class ResultWiki extends Component {
  constructor(props){
    super(props);
    if (Array.isArray(props.location.state.data))
      this.datos = props.location.state.data[0].data;
    else
      this.datos = props.location.state.data.data;
    //this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div>
        <Row isColumn>
         <h1 className="texto_principal_peticiones">{this.datos.name}</h1>
        </Row>
        <Row isColumn>
          <div className="search">
            <fieldset>
              <legend><h3>Contenido</h3></legend>
                {this.datos.content}
            </fieldset>
          </div>
          /*<div className="search">
            <fieldset>
              <legend><h5>Links</h5></legend>
              {
                this.datos.links.map(function(link) {
                    return <li key={link}><a href="#">{link}</a></li>
                })
              }
            </fieldset>
          </div>*/
        </Row>
      </div>
    );
  }
}

