import React from 'react';
import ReactDOM from 'react-dom';
//import Principal from './Principal';
//import App from './App';


import Routes from './routes';

import {hashHistory } from 'react-router'

import './index.css';
import 'react-foundation';

ReactDOM.render(
  <Routes history={hashHistory}/>,
  document.getElementById('root')
);
