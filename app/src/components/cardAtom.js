import React from 'react';

const CardAtom = (props) => {
    return (
        <div className="roundCard" key={props.cardData._id}>
              <a href={'/showcard/' + props.cardData._id}>
               <img src={props.cardData.cardImgSrc} />
              </a>
              <h2>{props.cardData.cardTitle}</h2>
        </div>
    );
};
export default CardAtom;


