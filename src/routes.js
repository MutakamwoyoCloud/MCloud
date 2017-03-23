// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';


import About from './components/About';
import NotFound from './components/NotFound';
import home from './HomeAux';

import Peticiones from './components/Peticiones';
import Correo from './components/Correo';
import Email from './components/Email';
//import {Correo} from './components/Correo';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={home} />
    <Route path="/about" component={About} />
    <Route path="/Peticiones" component={Peticiones} />
    <Route path="/Correo" component={Correo} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;