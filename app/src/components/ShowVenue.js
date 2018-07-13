import React, { Component } from 'react';
import axios from 'axios';
import baseUrl from '../helpers/urlHelpers';


class ShowVenue extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coords: [],
      link: ''
    };
  }

  componentDidUpdate(prevProps){
    if (this.state.link === '' && this.props.longitude && this.props.latitude){
      this.getVenues(this.props.latitude, this.props.longitude);
    }
  }

//   shouldComponentUpdate(nextProps) {
//     const differentLink = this.props.link !== nextProps.link;
//     return differentLink;
// }

  getVenues = function (){
    console.log('go and find the location at the network api', this.props.latitude, this.props.longitude);
    axios.get(`${baseUrl}/api/cards/getlinks/${this.props.latitude}/${this.props.longitude}`)
          .then(res => {
            this.setState((prevState, props) => {
              if (prevState.link !== res.data )
                return {link: res.data};
            });
    });
  }

  render() {
    if (this.state.link !== '' && this.state.link !== '#'){
      if (typeof window !== 'undefined') {
          window.location.href = this.state.link;
      }
    }
    return (
        <div className="mat-shadow effect-popup">
          { (this.props.longitude && this.state.link === '') &&
            <div>
              <span className="glyphicon glyphicon-refresh glyphicon-spin"></span>
              <h1>Loading deals nearby</h1>
              <span className="banner-message__small">This won't take too much</span>
            <a href="https://dealby.us/" alt="Refresh Scan" title="Refresh scanning process" className="refreshBtn mat-shadow ripple">Refresh Scan</a>
            </div>
          }
          { (this.state.link !== '#' && typeof(this.props.longitude) == 'undefined') &&
            <div>
              <span className="glyphicon glyphicon-refresh glyphicon-map-marker"></span>
              <h1>Getting your position</h1>
              <span className="banner-message__small">Accessing device location. Remember to enable device location (GPS)</span>
            <a href="https://dealby.us/" alt="Refresh Scan" title="Refresh scanning process" className="refreshBtn mat-shadow ripple">Refresh Scan</a>
            </div>
          }
          { this.state.link === '#' && 
            <div>
              <span className="glyphicon glyphicon-remove-circle"></span>
              <h1> We couldn't find any deal nearby. Sorry :( </h1>
              <span className="banner-message__small">Please, move closer to malls or businesses and try again</span>
              <a href="https://dealby.us/" alt="Refresh Scan" title="Refresh scanning process" className="refreshBtn mat-shadow ripple">Refresh Scan</a>
            </div>
          }
            
        </div>
    );
  }
}

export default ShowVenue;
