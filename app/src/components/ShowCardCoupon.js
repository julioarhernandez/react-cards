import React, { Component } from 'react';
import axios from 'axios';
import Header from './header';
import Footer from './footer';
import baseUrl from '../helpers/urlHelpers';
import DropDownMenu from './dropDownMenu';
import Barcode from 'react-barcode';

//Share button dependencies
import {
  ShareButtons,
  generateShareIcon
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const WhatsappIcon = generateShareIcon('whatsapp');
const EmailIcon = generateShareIcon('email');

class ShowCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }
  
  componentDidMount() {
    axios.get(`${baseUrl}/api/cards/getcard/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ 
          cards: res.data,
          shareUrl: `https://dealby.us/showcardcoupon/${res.data[0]["cards"]["_id"]}`,
          title : `DealBy - ${res.data[0]["bizName"]} - ${res.data[0]["cards"]["cardTitle"]}`
         });
         document.title = `${this.state.title}`;
        //  console.log(this.state.cards);
      });
    // Set page title
    
  }

  render() {

    return (
      <div>
        <Header showBack={this.state.cards} showRefresh={false}/>
        {this.state.cards.map( car => 
        <div className="roundCard card-only" key={car.cards._id}>
            <div className="bizTitle">
               <img id="imgletterhead" src={car.bizLogo} alt={car.bizName} />
               <h2>{car.bizName}</h2>
               <span>{car.bizAddress.street}. {car.bizAddress.county}, {car.bizAddress.state} {car.bizAddress.zip}</span>
               <DropDownMenu web={car.bizWeb} number={car.bizPhone} location={car.bizLocation} />
            </div>
            <img src={car.cards.cardImgSrc} alt={car.cards.cardTitle} />
            <div className="social-share">
              <span>Share it</span>
              <FacebookShareButton
                url={this.state.shareUrl}
                quote={this.state.title}
                className="Demo__some-network__share-button">
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={this.state.shareUrl}
                title={this.state.title}
                className="Demo__some-network__share-button">
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton
                url={this.state.shareUrl}
                title={this.state.title}
                separator=":: "
                className="Demo__some-network__share-button">
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <GooglePlusShareButton
                url={this.state.shareUrl}
                className="Demo__some-network__share-button">
                <GooglePlusIcon
                  size={32}
                  round />
              </GooglePlusShareButton>
              <EmailShareButton
                url={this.state.shareUrl}
                subject={this.state.title}
                body={this.state.shareUrl}
                className="Demo__some-network__share-button">
                <EmailIcon
                  size={32}
                  round />
              </EmailShareButton>   
            </div>
            <h2>{car.cards.cardTitle}</h2>
            <hr />
            <p dangerouslySetInnerHTML={{ __html: car.cards.cardContent }}></p>
            <div id="couponSpace"><Barcode value={car.cards.cardCoupon ? car.cards.cardCoupon : "dealBy" } /></div>
        </div> 
        
        )} 
        <Footer />
      </div>
    );
  }
}

export default ShowCard;
