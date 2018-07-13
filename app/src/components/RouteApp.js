import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import ShowCards from './ShowCards';
import ShowCardsBiz from './ShowCardsBiz';
import ShowCard from './ShowCard';
import ShowVenues from './ShowVenues';
import ShowMaps from './ShowMaps';
import ShowCardCoupon from './ShowCardCoupon';


const RouteApp = () => (
    <Router>
      <div>
        <Route exact path='/index.html' component={ShowVenues} />
        <Route exact path='/' component={ShowVenues} />
        <Route path='/showvenue/:id' component={ShowCards} />
        <Route path='/showmaps/' component={ShowMaps} />
        <Route path='/showcard/:id' component={ShowCard} />
        <Route path='/showcardcoupon/:id' component={ShowCardCoupon} />
        <Route path='/showbiz/:id' component={ShowCardsBiz} />
      </div>
  </Router>
)
export default RouteApp;
