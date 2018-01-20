import React from 'react';

const CardBase = (props) => {
    return (
        <div className="roundCard" key={props.cardData._id}>
              <div className="bizTitle">
               <img id="imgletterhead" src={props.bizLogo} />
               <h2>{props.bizName}</h2>
               <span>{props.bizAddress}</span>
              </div>
              <a href={'/showcard/' + props.cardData._id}>
               <img src={props.cardData.cardImgSrc} />
              <h2>{props.cardData.cardTitle}</h2></a>
        </div>
    );
};
export default CardBase;


