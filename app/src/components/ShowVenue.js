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
    console.log('go and find the location at the network api', this.props.latitude);
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
          { this.state.link !== '#' &&
           <div>
             <span className="glyphicon glyphicon-refresh glyphicon-spin"></span>
             <h1>Loading deals nearby</h1>
             <span className="banner-message__small">Please, enable device location (GPS)</span>
           </div>
          }
          { this.state.link === '#' && 
            <div>
              <span className="glyphicon glyphicon-remove-circle"></span>
              <h1> We couldn't find any deal nearby. Sorry :( </h1>
              <span className="banner-message__small">Please, move closer to malls or businesses and try again</span>
            </div>
          }
           <a href="https://dealby.us/" alt="Refresh Scan" title="Refresh scanning process" className="refreshBtn mat-shadow ripple">Refresh Scan</a>
        </div>
    );
  }
}

export default ShowVenue;
