import React from 'react';
import CardBase from "./cardType/cardBase";
import CardFullImage from "./cardType/cardFullImage";
import CardVideo from "./cardType/cardVideo";

const CardAtom = (props) => {
    switch (props.cardData.cardType) {
        case "1":
            return <CardBase {...props}/>
            break;
        case "2":
            return <CardFullImage {...props}/>
            break;
        case "3":
            return <CardVideo {...props}/>
            break;
    }
};
export default CardAtom;


