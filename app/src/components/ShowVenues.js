import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Header from './header';
import Footer from './footer';
import CardAtom from './cardAtom';
import baseUrl from '../helpers/urlHelpers';
import Geolocation from './Geolocation';

class ShowVenues extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }

//   componentDidMount() {
//     axios.get( `${baseUrl}/api/cards/venues/${this.props.match.params.id}`)
//       .then(res => {
//         this.setState({ cards: res.data });
//         //console.log(this.state.cards);
//       });
//   }

  render() {
    return (
      <div>
        <Header />
        {!this.props.isGeolocationAvailable
            ? <div>Your browser does asdport Geolocation</div>
            : <div>Silo</div> }
        

        {/* {this.state.cards.map( car=> 
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
        )} */}
        <Footer/>
    </div>
    );
  }
}

export default ShowVenues;
