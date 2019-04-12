import React, { Component } from 'react';

class CardsInfo extends Component {
  render() {
    return(
      <div className="CardsInfo">
        <div className="container">
            <div className="CardsInfo-header">
                <img src={this.props.cardImgSrc} />
            </div>
            <div className="CardsInfo-body">
                <h1>{this.props.cardTitle}</h1>
                <div className="aside_link">
                    <a href={'/getbizcard/' + this.props.bizId} className="materialLink">
                        Edit Deal
                    </a>
                </div>
            </div>
        </div>
      </div>
  );
  }
}

export default CardsInfo;
