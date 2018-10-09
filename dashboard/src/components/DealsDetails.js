import React, { Component } from 'react';
import Header from "./Header";
import Mainlink from "./Mainlink";
import DealDetail from "./DealDetail";

import AuthService from './AuthService';
import withAuth from './withAuth';
const Auth = new AuthService();

class DealsDetails extends Component {
  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login');
 }
 componentDidMount(){
     console.log();
 }
  render() {
    return(
      <React.Fragment>
        <Header />
        <Mainlink activeClass="deals"/>
        <DealDetail dealId={this.props.match.params.id}/>
      </React.Fragment>
    //   <div className="Deals">
    //       {/* <div className="Deals-header">
    //           <img src={logo} className="Deals-logo" alt="logo" />
    //           <h2>Welcome {this.props.user.payload.email}</h2>
    //       </div> */}
    //       <p className="Deals-intro">
    //           <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
    //       </p>
    // </div>
  );
  }
}

export default withAuth(DealsDetails);
