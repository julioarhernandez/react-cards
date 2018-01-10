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
        
        {this.state.cards.map( car => 
        <div class="roundCard">
            <img src={car.cards.cardImgSrc} />
            <h2>{car.cards.cardTitle}</h2>
            <p dangerouslySetInnerHTML={{ __html: car.cards.cardContent }}></p>
        </div> 
        
        )}    
        </div>
    );
  }
}

export default ShowCard;
