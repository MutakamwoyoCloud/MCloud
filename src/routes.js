// src/routes.js
import React from 'react';
import { Router, Route , browserHistory} from 'react-router';


//import About from './components/About';
import NotFound from './components/NotFound';
//import home from './HomeAux';
import Principal from './Principal';
import Peticiones from './components/Peticiones';
import Correo from './components/Correo';
import Vademecum from './components/Vademecum';
import Youtube from './components/Youtube';
//import PrincipalAux from './PrincipalAux';
//import {Correo} from './components/Correo';

const Routes = (props) => (
  
  //const Routes = () =>(
	  <Router history={browserHistory}>
	    <Route path="/" component={Principal} />
	    <Route path="/peticiones" component={Peticiones} />
	    <Route path="/vademecum" component={Vademecum} />
	    <Route path="/youtube" component={Youtube} />
	    <Route path="/correo" component={Correo} />
	    <Route path="*" component={NotFound} />
  	  </Router>
  
);

export default Routes;