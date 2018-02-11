import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './header';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }

  componentDidMount() {
    axios.get('/api/cards')
      .then(res => {
        this.setState({ cards: res.data });
        //console.log(this.state.cards);
      });
  }

  render() {
    return (
      <Header />
    );
  }
}

export default App;
