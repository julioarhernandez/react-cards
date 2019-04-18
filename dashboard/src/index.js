import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';


import Deals from "./components/Deals";
import DealsDetails from "./components/DealsDetails";
import Login from "./components/login";
import Business from "./components/Business";
import CardsInfo from "./components/CardsInfo";
import User from "./components/User";

import './stylesheets/main.scss';

ReactDOM.render(
    <Router>
      <React.Fragment>
        <Route exact path='/' component={Deals} />
        <Route exact path='/deals' component={Deals} />
        <Route exact path='/deal/:bid/:cid' component={DealsDetails} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/users' component={User} />
        <Route exact path='/business' component={Business} />
        <Route exact path='/getcards/:id' component={CardsInfo} />
      </React.Fragment>
  </Router>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
