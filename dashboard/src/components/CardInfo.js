import React, { Component } from 'react';
import { Link } from "react-router-dom";

class CardInfo extends Component {
  render() {
    const {cardImgSrc, ...others} = this.props.cards;
    console.log(this.props.cards);
    const bizId = this.props.id;
    return(
        <div className="DealsCards">
            <div className="container -flex-wrap">
                <div className="DealsCards-item -border-blue-light">
                    <div className="DealsCards-header">
                        <div className="DealsCards-image">
                            <figure>
                                <img src={this.props.cards.cardImgSrc} alt="Deal"/>
                            </figure>
                        </div>
                    </div>
                    <div className="DealsCards-body">
                        <div className="DealsCards-title">
                            <h1>{this.props.cards.cardTitle}</h1>
                        </div>
                        <div className="DealsCards-description">
                            <h2>Description of the deal you are displaying in the real cards wityh ellipsis at the end</h2>
                        </div>
                    </div>
                    <div className="DealsCards-aside">
                        <Link to={`/deal/${bizId}/${this.props.cards._id}`} className="btn btn-blue -block">
                            Edit Deal
                        </Link>
            
                    </div>
                </div>
            </div>
        </div>
  );
  }
}

export default CardInfo;
