import React from 'react';
import DropDownMenu from '../dropDownMenu';

const CardBaseCoupon = (props) => {
    return (
        <div className="roundCard" key={props.cardData._id}>
            <a href={'/showcard/' + props.cardData._id}>
                <div className="imgWrap">
                    <img src={props.cardData.cardImgSrc} className="Card-detail-link" alt={props.cardData.cardTitle} />
                </div>
            </a>
            <div className="bizTitle">
               {/* <img id="imgletterhead" src={props.bizLogo} alt={props.bizName}/> */}
               <DropDownMenu web={props.bizWeb} number={props.bizPhone} location={props.bizLocation} />
               <h2>{props.bizName}</h2>
               {/* <span>{props.bizAddress.street}. {props.bizAddress.county}, {props.bizAddress.state} {props.bizAddress.zip}</span> */}
            </div>
            <a href={'/showcardcoupon/' + props.cardData._id}>
                <h2 className="Card-detail-link-header" >{props.cardData.cardTitle}</h2>
            </a>
            <hr />
            <a href={'/showcard/' + props.cardData._id} className="materialLink">
                Get deal
            </a>
        </div>
    );
};
export default CardBaseCoupon;


