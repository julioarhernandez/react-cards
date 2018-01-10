import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

class ShowCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }

  

  componentDidMount() {
    axios.get('/api/cards/getcard/'+this.props.match.params.id)
      .then(res => {
        // var groupBy = function(xs, key) {
        //   return xs.reduce(function(rv, x) {
        //     (rv[x[key]] = rv[x[key]] || []).push(x);
        //     return rv;
        //   }, {});
        // };
        // var groubedByTeam=groupBy(res.data, 'bizId')

        // this.setState({ cards: groubedByTeam });
        this.setState({ cards: res.data });
        console.log(this.state.cards);
      });
  }

  // delete(id){
  //   console.log(id);
  //   axios.delete('/api/cards/'+id)
  //     .then((result) => {
  //       this.props.history.push("/")
  //     });
  // }

  render() {
    return (
      <div>
        <div class="roundCard">
            <a href={this.state.cards.cards.cardLink}><img src={this.state.cards.cards.cardImgSrc} /></a>
            <h2>{this.state.cards.cards.cardTitle}</h2>
        </div>
    </div>
    );
  }
}

export default ShowCard;
