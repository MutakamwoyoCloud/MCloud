import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect, Link} from 'react-router';
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

	constructor(){
    super();
  }
  render() {
    return (
      <div className="display">
        <Row>
        	<Column large={4} small={12}>
        		<Link to="/wikipedia"><Button id="Wikipedia" color={Colors.PRIMARY} isExpanded> <WikipediaIcon id="Wikipedia" size={Sizes.LARGE}/></Button></Link>
        	</Column>
        	<Column large={4} small={12}>
        		<Link to="/vademecum"><Button id="Vademecum" color={Colors.SUCCESS} isExpanded><HospitalIcon id="Vademecum" size={Sizes.LARGE}/></Button></Link>
        	</Column>
        </Row>
        <Row>
          <Column large={4} small={12}>
            <Link to="/youtube"><Button id="YouTube" color={Colors.ALERT} isExpanded><YouTubeIcon id="YouTube" size={Sizes.LARGE}/></Button></Link>
          </Column>
        	<Column large={4} small={12}>
        		<Link to="/correo"><Button id="Correo" color={Colors.SECONDARY} isExpanded><EmailIcon id="Correo" size={Sizes.LARGE}/></Button></Link>
        	</Column>
        </Row>
      </div>
    );
  }
}

export default Principal;
