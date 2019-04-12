import React, { Component } from 'react';
import axios from "axios";
import baseUrl from "../helpers/urlHelpers";
import Header from "./Header";
import Mainlink from "./Mainlink";
import BusinessInfo from "./BusinessInfo";
// import './App.css';

// import AuthService from './components/AuthService';
import withAuth from './withAuth';
// const Auth = new AuthService();

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }
  
  componentDidMount() {
    axios.get( `${baseUrl}/api/cards/getbizcards/${this.props.id}`)
      .then(res => {
        this.setState({ cards: res.data });
      });
  }

  render() {
    return(
      <React.Fragment>
        <Header />
        <Mainlink activeClass="deals"/>
        {this.state.cards.map( card => 
          <React.Fragment>
            <CardInfo {...card} />
          </React.Fragment>
        )}

      </React.Fragment>
  );
  }
}

export default withAuth(Cards);
