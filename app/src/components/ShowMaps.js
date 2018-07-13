import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Header from './header';
import Footer from './footer';
// import axios from 'axios';
// import baseUrl from '../helpers/urlHelpers';

const styleMap = {
    width: '100%',
    height: '85vh',
  }

class ShowMaps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            remoteMarkers: [],
        };
        this.MapMarker = this.MapMarker.bind(this);
        this.fetchPlaces = this.fetchPlaces.bind(this);

    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
    });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };

    windowHasClosed = (props) => {
        
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          });
       
      };

     MapMarker = (props) => {
        return(
            <Marker onClick={this.onMarkerClick} 
                    name={props.lat} 
                    position={{ lat: props.lat, lng: props.lng }}
                    key={props.lat}
            />
        );
    };

    fetchPlaces(mapProps, map) {
    // Give the call to api to receive the markers
    this.setState({ remoteMarkers: [
        { lat: 25.736589, lng: -80.385687 },
        { lat: 26.736589, lng: -80.385687 },
        { lat: 27.736589, lng: -80.385687 },
    ]});
    };

      render() {
          return (
            <div>
                <Header showHome/>
                <Map google={this.props.google} 
                     onReady={this.fetchPlaces}
                     initialCenter={{
                        lat: 25.736589,
                        lng: -80.385687
                      }}
                      style={styleMap}
                      zoom={11}>

                    { this.state.remoteMarkers !== '' && 
                        this.state.remoteMarkers.map((x) => this.MapMarker(x)) }
                    
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.windowHasClosed}>
                        <div>
                            <h1>Directions</h1>
                            <span>{this.state.selectedPlace.name}</span>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
          );
        }
}
export default GoogleApiWrapper({
    apiKey: ('AIzaSyDOUCi0QM_s8O5A1CxPS3eOdtoesN2eRSg')
  })(ShowMaps)