// src/routes.js
import React from 'react';
import { Router, Route , browserHistory} from 'react-router';

import NotFound from './components/NotFound';
import Principal from './Principal';
import Peticiones from './components/Peticiones';
import Correo from './components/Correo';
import Result from './components/Result';
import Test from './components/Test';

const Routes = (props) => (
  
	  <Router history={browserHistory}>
	    <Route path="/" component={Principal} />
	    <Route path="/wikipedia" name='Wikipedia' component={Peticiones} />
	    <Route path="/vademecum" name='Vademecum' component={Peticiones} />
	    <Route path="/youtube" name='Youtube' component={Peticiones} />
	    <Route path="/correo" name='Correo' component={Correo} />
	    <Route path="/result" name='Resultado' component={Result} />
	    <Route path="/test" name='test' component={Test}/>
	   
	    <Route path="*" component={NotFound} />
  	  </Router>
  
);

export default Routes;