import React from 'react';
import '../../topDownVideo.css';
import DropDownMenu from '../dropDownMenu';

const CardVideo = (props) => {
    return (
        <div className="roundCard fullImage fullVideo" key={props.cardData._id}>
            <a href={props.cardData.cardLink} target="_blank">
                <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
               <div className="shadow">
                <div className="imgWrap">
                    <img src={props.cardData.cardImgSrc} className="Card-detail-link" alt={props.cardData.cardTitle} />
                </div>
                </div>
            </a>
            <div className="bizTitle">
               <img id="imgletterhead" src={props.bizLogo} alt={props.bizName}/>
               <h2>{props.bizName}</h2>
            </div>
            <a href={props.cardData.cardLink} target="_blank">
                <h2 className="Card-detail-link-header" >{props.cardData.cardTitle}</h2>
            </a>
            <hr />
            <div className="aside">
                <div className="aside_link">
                <a href={props.cardData.cardLink} className="materialLink" target="_blank">
                    Open Video
                </a>
                </div>
                <div className="aside_info">
                    <DropDownMenu web={props.bizWeb} number={props.bizPhone} location={props.bizLocation} />
                </div>
            </div>
           
        </div>

        // <div className="roundCard fullImage fullVideo" key={props.cardData._id}>
        //       <div className="bizTitle">
        //        <img id="imgletterhead" src={props.bizLogo} alt={props.bizName}/>
        //        <h2>{props.bizName}</h2>
        //        <span>{props.bizAddress.street}. {props.bizAddress.county}, {props.bizAddress.state} {props.bizAddress.zip}</span>
        //       </div>
        //       <a href={props.cardData.cardLink} target="_blank">
        //        <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
        //        <div className="shadow">
        //        <div className="imgWrap">
        //          <img src={props.cardData.cardImgSrc} className="Card-detail-link" alt={props.cardData.cardTitle}/>
        //        </div>
        //        </div>
        //        <h2 className="Card-detail-link" >{props.cardData.cardTitle}</h2>
        //       </a>
        // </div>
    );
};
export default CardVideo;


