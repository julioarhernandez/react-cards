import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Header from './header';
import CardAtom from './cardAtom';
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
        this.setState({ cards: res.data });
        console.log(this.state.cards);
      });
  }

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
          {car.cards.map( tar => 
            <div> 
              <CardAtom cardData={tar} /> 
            </div>
          )}    
        </Slider>
        )}
    </div>
    );
  }
}

export default ShowCards;
