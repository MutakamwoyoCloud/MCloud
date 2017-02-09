import React, { Component } from 'react';
var Row = require('react-foundation').Row;

require('react-foundation');

class Result extends Component {
  constructor(props){
    super(props);
    this.name = props.name;
    //this.handleChange = this.handleChange.bind(this);
    this.table = undefined;
  }

  render() {
    if(this.links){
      var links_html = []
      for (var l in this.links) {
          links_html.push(<a>l</a>);
      }
    }
    return (
      <div>
        <Row isColumn>
         <label className="texto_principal_peticiones">{this.name}</label>
        </Row>
        <Row isColumn>
          <div className="search">
            <fieldset>
              <legend>Contenido</legend>
              {this.contenido}
            </fieldset>
          </div>
          <div className="search">
            <fieldset>
              <legend>Links</legend>
              {links_html}
            </fieldset>
          </div>
        </Row>
      </div>
    );
  }
}

export default Result;
