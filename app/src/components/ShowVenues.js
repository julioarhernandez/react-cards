import React, { Component } from 'react';

import Header from './header';
import Footer from './footer';
import ShowVenue from './ShowVenue';
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
        <Header showMap extraClass=""/>
        <GeoLocation
          render={({
            fetchingPosition,
            position: { coords: { latitude, longitude } = {} } = {},
            error,
            getCurrentPosition
          }) =>
            <div className="banner-message">
              {/* <LocationMessage latitude={latitude} longitude={longitude} error={error && error.message} getCurrentPosition={this.getCurrentPosition}/> */}
              <ShowVenue latitude={latitude} longitude={longitude} error={error && error.message}/>
            </div>}
        />
      
        <Footer/>
    </div>
    );
  }
}

export default ShowVenues;
