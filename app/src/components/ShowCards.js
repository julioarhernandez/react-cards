import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Header from './header';
import baseUrl from '../helpers/urlHelpers';

class ShowCards extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }

  

  componentDidMount() {
    axios.get( `${baseUrl}/api/cards/venues/${this.props.match.params.id}`)
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
        <Header />
        {this.state.cards.map( car=> 
        <Slider {...settings}>
          {car.cards.map( tar=> 
            <div className="roundCard" key={tar._id}>
              <a href={'/showcard/' + tar._id}><img src={tar.cardImgSrc} /></a>
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
