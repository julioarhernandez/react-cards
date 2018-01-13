import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Header from './header';

class ShowCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }
  
  componentDidMount() {
    axios.get('/api/cards/getcard/'+this.props.match.params.id)
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
        <div class="roundCard card-only">
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
