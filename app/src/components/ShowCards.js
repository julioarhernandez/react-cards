import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Header from './header';
import Footer from './footer';
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
        //console.log(this.state.cards);
      });
  }

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      swipe: true,
      lazyLoad: true, 
      slidesToShow: 1,
      slidesToScroll: 1,
      className: "innerSlide",
      arrows: true
    };
    return (
      <div>
        <Header showRefresh={true} showMap extraClass=""/>
        {this.state.cards.map( car=> 
        <Slider {...settings}>
          {car.cards.map( tar => 
            <div> 
              <CardAtom cardData={tar} 
                bizName={car.bizName} 
                bizLogo={car.bizLogo} 
                venueName={car.veName} 
                bizAddress={car.bizAddress}
                bizPhone={car.bizPhone}
                bizWeb={car.bizWeb}
                bizLocation={car.bizLocation}
                /> 
            </div>
          )}    
        </Slider>
        )}
        <Footer/>
    </div>
    );
  }
}

export default ShowCards;
