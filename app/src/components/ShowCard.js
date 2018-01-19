import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Header from './header';
import baseUrl from '../helpers/urlHelpers';

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
        this.setState({ cards: res.data });
        console.log(this.state.cards);
      });
  }

  // delete(id){
  //   console.log(id);
  //   axios.delete('/api/cards/'+id)
  //     .then((result) => {
  //       this.props.history.push("/")
  //     });
  // }

  render() {
    return (
      <div>
         <Header showBack />
        {this.state.cards.map( car => 
        <div className="roundCard card-only" key={car.cards._id}>
            <div className="bizTitle">
               <img id="imgletterhead" src={car.bizLogo} />
               <h2>{car.bizName}</h2>
               <span>{car.veName}</span>
            </div>
            <img src={car.cards.cardImgSrc} />
            <h2>{car.cards.cardTitle}</h2>
            <hr />
            <p dangerouslySetInnerHTML={{ __html: car.cards.cardContent }}></p>
        </div> 
        
        )}    
        </div>
    );
  }
}

export default ShowCard;
