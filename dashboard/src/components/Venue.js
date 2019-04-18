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
                email: this.state.email, 
                password: this.state.password
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
        <Mainlink activeClass="venue" role={this.props.user.payload.type}/>
        <div className="VenueCard">
            <div className="container -flex-wrap">
                <div className="VenueCard-item">
                    <form onSubmit={this.preventSubmit}>
                        <div className="VenueCard-body">
                            <div className="VenueCard-name">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="name" onChange={this.handleChange} value={this.state.email}/>
                            </div>
                            <div className="VenueCard-slug">
                                <label htmlFor="slug">Venue Slug</label>
                                <input type="text" name="slug" id="slug" onChange={this.handleChange} value={this.state.password}/>
                            </div>
                            <div className="VenueCard-pointLocation">
                                <label htmlFor="point-Location">Point Location</label>
                                <input type="text" name="point-Location" id="point-Location" onChange={this.handleChange} value={this.state.email} />
                            </div>
                            <div className="VenueCard-polygonLocation">
                                <label htmlFor="polygon-Location">Boundary coordinates</label>
                                <textarea rows="4" value={this.state.description} name="polygon-Location" id="polygon-Location" onChange={this.handleChange}/>
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
