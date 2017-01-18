import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//import './App.css';
import App from './App'
import '../node_modules/foundation-sites/dist/css/foundation.min.css';
import '../node_modules/fixed-data-table/dist/fixed-data-table.min.css';
import WikipediaIcon from '../node_modules/react-icons/lib/fa/wikipedia-w';
import HospitalIcon from '../node_modules/react-icons/lib/fa/hospital-o';
import YouTubeIcon from '../node_modules/react-icons/lib/fa/youtube';
import EmailIcon from '../node_modules/react-icons/lib/md/mail-outline';
var Row = require('react-foundation').Row;
var Column = require('react-foundation').Column;
var Button = require('react-foundation').Button;
var Sizes = require('react-foundation').Sizes;
var Colors = require('react-foundation').Colors;

class Principal extends Component {

	construct(props){
		this.handleClick = this.handleClick.bind(this);
  }


  handleClick(event) {
    var name = event.target.id;
    ReactDOM.render(<App name={name}/>, document.getElementById('root'));
  }

  render() {
    return (
      <div className="display">
        <Row>
        	<Column large={4} small={12}>
        		<Button onClick={this.handleClick} color={Colors.SECONDARY} isExpanded><WikipediaIcon id="Wikipedia" size={Sizes.LARGE}/></Button>
        	</Column>
        	<Column large={4} small={12}>
        		<Button onClick={this.handleClick} color={Colors.SECONDARY} isExpanded><HospitalIcon id="Vademecum" size={Sizes.LARGE}/></Button>
        	</Column>
        	<Column large={4} small={12}>
        		<Button onClick={this.handleClick} color={Colors.SECONDARY} isExpanded><YouTubeIcon id="YouTube" size={Sizes.LARGE}/></Button>
        	</Column>
        </Row>
        <Row>
        	<Column large={6} small={12}>
        		<Button onClick={this.handleClick} color={Colors.SECONDARY} isExpanded><EmailIcon id="Correo" size={Sizes.LARGE}/></Button>
        	</Column>
        	<Column large={6} small={12}>
        		<Button onClick={this.handleClick} color={Colors.SECONDARY} isExpanded><EmailIcon id="" size={Sizes.LARGE}/></Button>
        	</Column>
        </Row>
      </div>
    );
  }
}

export default Principal;
