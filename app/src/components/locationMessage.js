import React, { Component } from 'react';
class LocationMessage extends Component {

  constructor(props) {
    super(props);
    this.state ={
      link: ''
    };
  }
  
  render() {
    return (
        <div>
            { !this.props.latitude && 
                <div>            
                    Please activate your mobile location and start searching for deals nearby.
                    {this.props.error && <div>{this.props.error}</div>}
                    <button onClick={this.props.getCurrentPosition}>Look For Deals</button>
                </div>}
        </div>

    );
  }
}

export default LocationMessage;
