// src/routes.js
import React from 'react';
import { Router, Route , browserHistory} from 'react-router';

import NotFound from './components/NotFound';
import Principal from './Principal';
import Peticiones from './components/Peticiones';
import Correo from './components/Correo';
import ResultWiki from './components/ResultWiki';
import ResultVademecum from './components/ResultVademecum';
import ResultYoutube from './components/ResultYoutube';
import Test from './components/Test';

const Routes = (props) => (
  
	  <Router history={browserHistory}>
	    <Route path="/" component={Principal} />
	    <Route path="/wikipedia" name='Wikipedia' component={Peticiones} />
	    <Route path="/vademecum" name='Vademecum' component={Peticiones} />
	    <Route path="/youtube" name='Youtube' component={Peticiones} />
	    <Route path="/correo" name='Correo' component={Correo} />
	    <Route path="/resultWiki" name='Resultado' component={ResultWiki} />
	    <Route path="/resultVademecum" name='Resultado' component={ResultVademecum} />
	    <Route path="/resultYoutube" name='Resultado' component={ResultYoutube} />
	    <Route path="/test" name='test' component={Test}/>
	   
	    <Route path="*" component={NotFound} />
  	  </Router>
  
);

export default Routes;