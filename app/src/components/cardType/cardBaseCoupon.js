import React from 'react';
import DropDownMenu from '../dropDownMenu';

const CardBaseCoupon = (props) => {
    return (
        <div className="roundCard" key={props.cardData._id}>
              <div className="bizTitle">
               <img id="imgletterhead" src={props.bizLogo} />
               <h2>{props.bizName}</h2>
               <span>{props.bizAddress.street}. {props.bizAddress.county}, {props.bizAddress.state} {props.bizAddress.zip}</span>
               <DropDownMenu web={props.bizWeb} number={props.bizPhone} location={props.bizLocation} />
              </div>
              <a className="Card-detail-link" href={'/showcardcoupon/' + props.cardData._id}>
              <div className="imgWrap">
               <img src={props.cardData.cardImgSrc} className="Card-detail-link" />
               </div>
              <h2 className="Card-detail-link" >{props.cardData.cardTitle}</h2></a>
        </div>
    );
};
export default CardBaseCoupon;


