import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import RouteApp from './components/RouteApp';

// Styles
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import './index.css';


ReactDOM.render(
  <RouteApp />, document.getElementById('root')
);
registerServiceWorker();
