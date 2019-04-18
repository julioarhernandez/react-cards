import React, { Component } from 'react';
// import axios from 'axios';
import { Link } from "react-router-dom";
import baseUrl from "../helpers/urlHelpers";
import AuthService from './AuthService';
import Header from './Header';
import Mainlink from './Mainlink';


import withAuth from './withAuth';

class Venue extends Component {
    constructor(){
        super();
    
        this.state = {
            showAlerts: false,
            email: '',
            password: ''
          };
        this.Auth = new AuthService();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.preventSubmit = this.preventSubmit.bind(this);

    }
    preventSubmit(e){
        e.preventDefault();
    }
    handleChange(e){
        this.setState(
            {
                showAlerts: false,
                [e.target.name]: e.target.value
            }
        )
    }
    handleFormSubmit(e){
        e.preventDefault();
        // const formData = new FormData();
        // formData.append('email', this.state.email);
        // formData.append('password', this.state.password);
        this.Auth.fetch(`${baseUrl}/api/cards/addvenue/`,{
            method: 'POST',
            body: JSON.stringify({
                veName: this.state.name, 
                veSlug: this.state.slug,
                veCoordinates: this.state.polygonLocation,
                vePointLocation: this.state.pointLocation,
                veAddressCountry: this.state.addressCountry,
                veAddressState: this.state.addressState,
                veAddressStreet: this.state.addressStreet,
                veAddressZip: this.state.addressZip,
                veAddressCounty: this.state.addressCounty
            })
        }).then(response => {
            if (response.status === 'Success'){
                this.setState({ 
                    showAlerts: true,
                    message: 'Changes saved sucessfully!'
                });
            }else {
                this.setState({ 
                    showAlerts: true,
                    message: 'Error. Please try again!'
                });
            }
        });
    }

  render() {

    return(
        <React.Fragment>
        <Header {...this.props}/>
        <Mainlink activeClass="venue" role="{this.props.user.payload.type}"/>
        <div className="VenueCard">
            <div className="container -flex-wrap">
                <div className="VenueCard-item">
                    <form onSubmit={this.preventSubmit}>
                        <div className="VenueCard-body">
                            <div className="VenueCard-name">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="name" onChange={this.handleChange} value={this.state.name}/>
                            </div>
                            <div className="VenueCard-slug">
                                <label htmlFor="slug">Venue Slug</label>
                                <input type="text" name="slug" id="slug" onChange={this.handleChange} value={this.state.slug}/>
                            </div>
                            <div className="VenueCard-pointLocation">
                                <label htmlFor="pointLocation">Point Location</label>
                                <input type="text" name="pointLocation" id="pointLocation" onChange={this.handleChange} value={this.state.pointLocation} />
                            </div>
                            <div className="VenueCard-polygonLocation">
                                <label htmlFor="polygonLocation">Boundary coordinates</label>
                                <textarea rows="4" value={this.state.polygonLocation} name="polygonLocation" id="polygonLocation" onChange={this.handleChange}/>
                            </div>
                            <div className="VenueCard-address">
                                <label htmlFor="addressCountry">Country</label>
                                <input type="text" name="addressCountry" id="addressCountry" onChange={this.handleChange} value={this.state.addressCountry} />
                            </div>
                            <div className="VenueCard-address">
                                <label htmlFor="addressState">State</label>
                                <input type="text" name="addressState" id="addressState" onChange={this.handleChange} value={this.state.addressState} />
                            </div>
                            <div className="VenueCard-address">
                                <label htmlFor="addressStreet">Street</label>
                                <input type="text" name="addressStreet" id="addressStreet" onChange={this.handleChange} value={this.state.addressStreet} />
                            </div>
                            <div className="VenueCard-address">
                                <label htmlFor="addressZip">Zip</label>
                                <input type="text" name="addressZip" id="addressZip" onChange={this.handleChange} value={this.state.addressZip} />
                            </div>
                            <div className="VenueCard-address">
                                <label htmlFor="addressCity">City</label>
                                <input type="text" name="addressCity" id="addressCity" onChange={this.handleChange} value={this.state.addressCity} />
                            </div>
                            
                        </div>
                        <div className="VenueCard-aside">
                            <Link to="#" className="btn btn-blue -block" onClick={this.handleFormSubmit}>
                                Create Venue
                            </Link>
                        </div>
                    </form>
                    {this.state.showAlerts && 
                    <div className="alert">
                    {this.state.message}
                    </div>}
                </div>
            </div>
         </div>
        </React.Fragment>
    
  );
  }
}

export default withAuth(Venue);

