import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        console.log(this.state.cards);
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              BOOK CATALOG
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Book</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>ISBN</th>
                  <th>Title</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {this.state.cards.map(card =>
                  <tr>
                    <td><Link to={`/show/${card.beLink}`}>{card.beName}</Link></td>
                    
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
