import React, { Component } from 'react';
class LocationMessage extends Component {

  constructor(props) {
    super(props);
    this.state ={
      link: ''
    };
  }

 recheckLocationPermission = function(){
      navigator.permissions.query({
        name: 'geolocation'
      }).then(function(result) {
        if (result.state === 'denied') {
          alert('You have denied the location service for the current page. Please allow the use of location for this to work');
        } 
    });
  }
  
  render() {
    return (
        <div>
            { !this.props.latitude && 
                <div>            
                    Please activate your mobile location and start searching for deals nearby.
                    {this.props.error && <div>{this.props.error}</div>}
                    <button onClick={this.recheckLocationPermission}>What's wrong?</button>
                </div>}
        </div>

    );
  }
}

export default LocationMessage;
