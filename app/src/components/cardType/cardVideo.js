import React from 'react';

const CardVideo = (props) => {
    return (
        <div className="roundCard fullImage fullVideo" key={props.cardData._id}>
              <div className="bizTitle">
               <img id="imgletterhead" src={props.bizLogo} />
               <h2>{props.bizName}</h2>
               <span>{props.bizAddress.street}. {props.bizAddress.county}, {props.bizAddress.state} {props.bizAddress.zip}</span>
              </div>
              <a href={props.cardData.cardLink} target="_blank">
               <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
               <div className="shadow">
               <div className="imgWrap">
                 <img src={props.cardData.cardImgSrc} />
               </div>
               </div>
               <h2>{props.cardData.cardTitle}</h2>
              </a>
        </div>
    );
};
export default CardVideo;


