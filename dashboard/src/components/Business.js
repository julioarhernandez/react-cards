import React, { Component } from 'react';
import Header from "./Header";
import Mainlink from "./Mainlink";
import BusinessInfo from "./BusinessInfo";
// import './App.css';

// import AuthService from './components/AuthService';
import withAuth from './withAuth';
// const Auth = new AuthService();

class Business extends Component {
  render() {
    return(
      <React.Fragment>
        <Header />
        <Mainlink activeClass="business"/>
        <BusinessInfo />
      </React.Fragment>
  );
  }
}

export default withAuth(Business);
