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
import Result from './components/Result';
import Test from './components/Test';
//import PrincipalAux from './PrincipalAux';
//import {Correo} from './components/Correo';

const Routes = (props) => (
  
  //const Routes = () =>(
	  <Router history={browserHistory}>
	    <Route path="/" component={Principal} />
	    <Route path="/peticiones" name='Wikipedia' component={Peticiones} />
	    <Route path="/vademecum" name='Vademecum' component={Vademecum} />
	    <Route path="/youtube" name='Youtube' component={Youtube} />
	    <Route path="/correo" name='Correo' component={Correo} />
	    <Route path="/result" name='Resultado' component={Result} />
        <Route path="/test" name='test' component={Test}/>
	    <Route path="*" component={NotFound} />
  	  </Router>
  
);

export default Routes;
