var React = require('react');  
var Button = require('react-foundation').Button;
var Row = require('react-foundation').Row;
var Column = require('react-foundation').Column;
var Sizes = require('react-foundation').Sizes;
var Icon = require('react-foundation').Icon;
//import {Row, Column, Button, Sizes, Icon} from '../node_modules/react-foundation';
var NameForm = React.createClass({
  render: function() {
    return (
      <div className="grid_form_request">
       <form>
        <Row className="search">
          <Column small={10} large={8}>
             Dato: <input type="text"/>
          </Column>
        </Row>
        <Row className="display">
          <Column small={10} large={6}>
            <label>Escoger un dia determinado (por defecto: esta noche)</label>
              <input type="Date"/>
          </Column>
          <Column small={10} large={3}>
              <label>Numero de coincidencias</label>
              <input type="number"/>
          </Column>
           <Column small={2} large={3}>
             <Button size={Sizes.SMALL}><Icon name="fi-list"/></Button>
          </Column>
        </Row>
       </form>
      </div>
    );
  }
});

module.exports = NameForm;