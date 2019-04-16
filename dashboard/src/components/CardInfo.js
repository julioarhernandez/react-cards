import React, { Component } from 'react';

class CardInfo extends Component {
  render() {
    const {cardImgSrc, ...others} = this.props.cards;
    console.log(this.props.cards);
    const bizId = this.props.id;
    return(
      <div className="CardInfo">
        <div className="container">
            <div className="CardInfo-header">
                <img src={this.props.cards.cardImgSrc} alt="Deal"/>
            </div>
            <div className="CardInfo-body">
                <h1>{this.props.cards.cardTitle}</h1>
                <div className="aside_link">
                    <a href={`/deal/${bizId}/${this.props.cards._id}`} className="materialLink">
                        Edit Dealsss
                    </a>
                </div>
            </div>
        </div>
      </div>
  );
  }
}

export default CardInfo;
