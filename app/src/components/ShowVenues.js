import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Header from './header';
import LocationMessage from './locationMessage';
import Footer from './footer';
import CardAtom from './cardAtom';
import ShowVenue from './ShowVenue';
import baseUrl from '../helpers/urlHelpers';
import GeoLocation from './GeoLocation';

class ShowVenues extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      coords: [],
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
        <GeoLocation
          render={({
            fetchingPosition,
            position: { coords: { latitude, longitude } = {} } = {},
            error,
            getCurrentPosition
          }) =>
            <div className="banner-message">
              <LocationMessage latitude={latitude} longitude={longitude} error={error && error.message} getCurrentPosition={this.getCurrentPosition}/>
              <ShowVenue latitude={latitude} longitude={longitude} />
            </div>}
        />
        

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
