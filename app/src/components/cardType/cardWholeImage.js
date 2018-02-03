import React from 'react';

const CardWholeImage = (props) => {
    return (
        <div className="roundCard wholeImage" key={props.cardData._id}>
              <div className="bizTitle">
               <img id="imgletterhead" src={props.bizLogo} alt={props.bizName}/>
               <h2>{props.bizName}</h2>
               <span>{props.bizAddress.street}. {props.bizAddress.county}, {props.bizAddress.state} {props.bizAddress.zip}</span>
              </div>
              <a href={props.cardData.cardLink} target="_blank">
               <div className="shadow">
               <div className="imgWrap">
                    <img src={props.cardData.cardImgSrc} alt={props.cardData.cardTitle}/>
                </div>
               </div>
               <h2>{props.cardData.cardTitle}</h2>
              </a>
        </div>
    );
};
export default CardWholeImage;


