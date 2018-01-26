import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import ShowCards from './ShowCards';
import ShowCardsBiz from './ShowCardsBiz';
import ShowCard from './ShowCard';
import App from './App';

const RouteApp = () => (
    <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/showvenue/:id' component={ShowCards} />
        <Route path='/showcard/:id' component={ShowCard} />
        <Route path='/showbiz/:id' component={ShowCardsBiz} />
      </div>
  </Router>
)
export default RouteApp;
