import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';
import ShowCards from './components/ShowCards';
import ShowCard from './components/ShowCard';

ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/showvenue/:id' component={ShowCards} />
        <Route path='/showcard/:id' component={ShowCard} />
      </div>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
