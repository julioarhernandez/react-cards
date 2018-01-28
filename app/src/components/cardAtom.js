import React from 'react';
import CardBase from "./cardType/cardBase";
import CardFullImage from "./cardType/cardFullImage";
import CardVideo from "./cardType/cardVideo";
import CardWholeImage from "./cardType/cardWholeImage";

const CardAtom = (props) => {
    switch (props.cardData.cardType) {
        case "1":
            return <CardBase {...props}/>
            break;
        case "2":
            return <CardVideo {...props}/>
            break;
        case "3":
            return <CardFullImage {...props}/>
            break;
        case "4":
            return <CardWholeImage {...props}/>
            break;
        default:
            return <CardBase {...props}/>
            break;
    }
};

export default CardAtom;


