import React from 'react';
import DropDownMenu from '../dropDownMenu';

const CardBase = (props) => {
    return (
        <div className="roundCard" key={props.cardData._id}>
            <a href={'/showcard/' + props.cardData._id}>
                <div className="imgWrap">
                    <img src={props.cardData.cardImgSrc} className="Card-detail-link" alt={props.cardData.cardTitle} />
                </div>
            </a>
            <div className="bizTitle">
               <img id="imgletterhead-home" src={props.bizLogo} alt={props.bizName}/>
               <h2>{props.bizName}</h2>
               {/* <span>{props.bizAddress.street}. {props.bizAddress.county}, {props.bizAddress.state} {props.bizAddress.zip}</span> */}
            </div>
            <a href={'/showcard/' + props.cardData._id}>
                <h2 className="Card-detail-link-header" >{props.cardData.cardTitle}</h2>
            </a>
            <hr />
            <div className="aside">
                <div className="aside_link">
                    <a href={'/showcard/' + props.cardData._id} className="materialLink">
                        Get deal
                    </a>
                </div>
                <div className="aside_info">
                    <DropDownMenu web={props.bizWeb} number={props.bizPhone} location={props.bizLocation} />
                </div>
            </div>
               
        </div>
    );
};
export default CardBase;


