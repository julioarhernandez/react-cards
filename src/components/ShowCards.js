import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

class ShowCards extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }

  

  componentDidMount() {
    axios.get('/api/cards/venues/'+this.props.match.params.id)
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
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      className: "innerSlide",
      arrows: true
    };
    return (
      <div>
        {this.state.cards.map( car=> 
        <Slider {...settings}>
          {car.cards.map( tar=> 
            <div class="roundCard">
              <a href={tar.cardLink}><img src={tar.cardImgSrc} /></a>
              <h2>{tar.cardTitle}</h2>
              
            </div>
          )}    
        </Slider>
        )}
    </div>
    );
  }
}

export default ShowCards;
