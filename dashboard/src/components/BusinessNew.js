import React, { Component } from 'react';
// import axios from 'axios';
import { Link } from "react-router-dom";
import baseUrl from "../helpers/urlHelpers";
import AuthService from './AuthService';
import Header from './Header';
import Mainlink from './Mainlink';


import withAuth from './withAuth';

class BusinessNew extends Component {
    constructor(){
        super();
    
        this.state = {
            showAlerts: false,
            message: '',
            email: '',
            password: ''
          };
        this.Auth = new AuthService();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.preventSubmit = this.preventSubmit.bind(this);
        this.validateInputs = this.validateInputs.bind(this);

    }
    preventSubmit(e){
        e.preventDefault();
    }
    validateInputs(){
        return  this.state.name && 
                this.state.slug && 
                this.state.polygonLocation &&
                this.state.pointLocation &&
                this.state.addressStreet &&
                this.state.addressZip
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
        if (this.validateInputs()){
            this.Auth.fetch(`${baseUrl}/api/cards/addbiz/`,{
                method: 'POST',
                body: JSON.stringify({
                    bizName: this.state.bizName,
                    bizWeb: this.state.bizWeb,
                    bizPhone: this.state.bizPhone,
                    bizLogo: this.state.bizLogo,
                    bizCountry: this.state.bizCountry,
                    bizState: this.state.bizState,
                    bizStreet: this.state.bizStreet,
                    bizZip: this.state.bizZip,
                    bizCounty: this.state.bizCounty,
                    bizVenueName: this.state.bizVenueName,
                    bizVenueSlug: this.state.bizVenueSlug,
                    bizCardAmount: this.state.bizCardAmount
                })
            }).then(response => {
                if (response.status === 'Success'){
                    this.setState({ 
                        showAlerts: true,
                        message: 'Changes saved sucessfully!'
                    });
                }else {
                    console.log(response);
                    this.setState({ 
                        showAlerts: true,
                        message: 'Error. Please try again!'
                    });
                }
            });
        }else{
            this.setState({ 
                showAlerts: true,
                message: 'Fill required inputs'
            })
        }
    }

  render() {

    return(
        <React.Fragment>
        <Header {...this.props}/>
        <Mainlink activeClass="venue" role="{this.props.user.payload.type}"/>
        <div className="BusinessCardNew">
            <div className="container -flex-wrap">
                <div className="BusinessCardNew-item">
                    <form onSubmit={this.preventSubmit}>
                        <div className="BusinessCardNew-body">
                            <div className="BusinessCardNew-name">
                                <label htmlFor="bizName">Name</label>
                                <input type="text" name="bizName" id="bizName" onChange={this.handleChange} value={this.state.bizName}/>
                            </div>
                            <div className="BusinessCardNew-slug">
                                <label htmlFor="bizWeb">Website</label>
                                <input type="text" name="bizWeb" id="bizWeb" onChange={this.handleChange} value={this.state.bizWeb}/>
                            </div>
                            <div className="BusinessCardNew-slug">
                                <label htmlFor="bizPhone">Phone</label>
                                <input type="text" name="bizPhone" id="bizPhone" onChange={this.handleChange} value={this.state.bizPhone}/>
                            </div>
                            <div className="BusinessCardNew-slug">
                                <label htmlFor="bizLogo">Logo</label>
                                <input type="text" name="bizLogo" id="bizLogo" onChange={this.handleChange} value={this.state.bizLogo}/>
                            </div>
                            <div className="BusinessCardNew-slug">
                                <label htmlFor="bizVenueName">Venue Name</label>
                                <input type="text" name="bizVenueName" id="bizVenueName" onChange={this.handleChange} value={this.state.bizVenueName}/>
                            </div>
                            <div className="BusinessCardNew-slug">
                                <label htmlFor="bizVenueSlug">Venue Slug</label>
                                <input type="text" name="bizVenueSlug" id="bizVenueSlug" onChange={this.handleChange} value={this.state.bizVenueSlug}/>
                            </div>
                            <div className="BusinessCardNew-pointLocation">
                                <label htmlFor="pointLocation">Point Location</label>
                                <input type="text" name="pointLocation" id="pointLocation" onChange={this.handleChange} value={this.state.pointLocation} placeholder="lat,long"/>
                            </div>
                            <div className="BusinessCardNew-polygonLocation">
                                <label htmlFor="polygonLocation">Boundary coordinates</label>
                                <textarea rows="4" value={this.state.polygonLocation} name="polygonLocation" id="polygonLocation" onChange={this.handleChange} placeholder="lat,long;lat,long;...lat,long"/>
                            </div>

                            <div className="BusinessCardNew-address">
                                <label htmlFor="addressStreet">Street</label>
                                <input type="text" name="addressStreet" id="addressStreet" onChange={this.handleChange} value={this.state.addressStreet} />
                            </div>
                            <div className="BusinessCardNew-address">
                                <label htmlFor="addressZip">Zip</label>
                                <input type="text" name="addressZip" id="addressZip" onChange={this.handleChange} value={this.state.addressZip} />
                            </div>
                            <div className="BusinessCardNew-address">
                                <label htmlFor="addressCity">City</label>
                                <input type="text" name="addressCity" id="addressCity" onChange={this.handleChange} value={this.state.addressCity} placeholder="Default:Miami"/>
                            </div>
                            <div className="BusinessCardNew-address">
                                <label htmlFor="addressState">State</label>
                                <input type="text" name="addressState" id="addressState" onChange={this.handleChange} value={this.state.addressState} placeholder="Default:FL"/>
                            </div>
                            <div className="BusinessCardNew-address">
                                <label htmlFor="addressCountry">Country</label>
                                <input type="text" name="addressCountry" id="addressCountry" onChange={this.handleChange} value={this.state.addressCountry} placeholder="Default:US"/>
                            </div>
                        </div>
                        <div className="BusinessCardNew-aside">
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

export default withAuth(BusinessNew);

