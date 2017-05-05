// src/routes.js
import React from 'react';
import { Router, Route , browserHistory} from 'react-router';

import NotFound from './components/NotFound';
import Principal from './Principal';
import Peticiones from './components/Peticiones';
import Correo from './components/Correo';
<<<<<<< HEAD
import Result from './components/Result';
=======
import Vademecum from './components/Vademecum';
import Youtube from './components/Youtube';
import Wikipedia from './components/Wikipedia';
//import PrincipalAux from './PrincipalAux';
//import {Correo} from './components/Correo';
>>>>>>> 2fce6bab8cfc230f8fab870e05540b0aaf9f30b3

const Routes = (props) => (
  
	  <Router history={browserHistory}>
	    <Route path="/" component={Principal} />
	    <Route path="/wikipedia" name='Wikipedia' component={Peticiones} />
	    <Route path="/vademecum" name='Vademecum' component={Peticiones} />
	    <Route path="/youtube" name='Youtube' component={Peticiones} />
	    <Route path="/correo" name='Correo' component={Correo} />
	    <Route path="/result" name='Resultado' component={Result} />	   
	    <Route path="*" component={NotFound} />
  	  </Router>
  
);

export default Routes;