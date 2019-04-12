import React, { Component } from 'react';
// import axios from 'axios';
import { Link } from "react-router-dom";
import imageSrc from "./images/emptyImage.png";
import withAuth from './withAuth';
import AuthService from './AuthService';

class DealDetail extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            image: '',
            cardId: '5a526749d0ddab4bcdcc1556',
            bizId: '790331'
          };
        this.Auth = new AuthService();
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.preventSubmit = this.preventSubmit.bind(this);

    }
    preventSubmit(e){
        e.preventDefault();
    }
    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    handleFileChange(e){
        this.setState(
            {
                image: e.target.files[0]
            }
        )
    }
    handleFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('cardId', this.state.cardId);
        formData.append('bizId', this.state.bizId);
        formData.append('image', this.state.image);
        this.Auth.fetch('http://localhost:3001/api/cards/upload/',{
            method: 'POST',
            mode: 'cors',
            body: formData
        }).then(response => {
            console.log(response);
        });
        // axios.post('http://localhost:3001/api/cards/upload/', formData)
    }
    

    componentDidMount () {
        const handle = this.props.dealId;
        console.log(handle);
        

        // fetch(`https://api.twitter.com/user/${handle}`)
        //     .then((user) => {
        //     this.setState(() => ({ user }))
        //     })
        }
  render() {
    return(
      <div className="DealsCards">
        <div className="container -flex-wrap">
            <div className="DealsCards-item -border-blue-light">
                <form name="dealcard-form" onSubmit={this.preventSubmit} encType="multipart/form-data">
                    <div className="DealsCards-header">
                        <div className="DealsCards-image">
                            <figure>
                                <img src={imageSrc} alt=""/>
                            </figure>
                            <input type="file" name="image" id="image" onChange={this.handleFileChange}/>
                        </div>
                    </div>
                    <div className="DealsCards-body">
                        <div className="DealsCards-title">
                        <input type="text" name="title" id="title" onChange={this.handleChange}/>
                            <h1>Title of the deal you are displaying in the real cards</h1>
                        </div>
                        <div className="DealsCards-description">
                        <textarea rows="2" cols="" name="description" id="description" onChange={this.handleChange}></textarea>
                            <h2>Description of the deal you are displaying in the real cards wityh ellipsis at the end</h2>
                        </div>
                    </div>
                    <div className="DealsCards-aside">
                        <Link to="/deals/12313123123" className="btn btn-blue -block" onClick={this.handleFormSubmit}>
                            Save Changes
                        </Link>
                    </div>
                </form>
            </div>
        </div>
      </div>
  );
  }
}

export default withAuth(DealDetail);
