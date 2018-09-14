import React from 'react';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';


const DropDownMenu = (props) => {
    return (
        <div>
            <Dropdown>
                <DropdownTrigger><div className="contextMenu"><span className="glyphicon glyphicon-info-sign"></span></div></DropdownTrigger>
                <DropdownContent>
                    <ul>
                        <li>
                        <a target="_blank" href={"https://www.google.com/maps/search/?api=1&query=" + props.location.coordinates} ><span className="glyphicon glyphicon-map-marker"></span> Directions</a>
                        </li>
                        <li>
                            <a target="_blank" href={props.web}><span className="glyphicon glyphicon-link"></span> Website</a>
                        </li>
                        <li>
                            <a  target="_blank" href={"tel:" + props.number}><span className="glyphicon glyphicon-earphone"></span> Call us</a>
                        </li>
                    </ul>
                </DropdownContent>
            </Dropdown>
            
        </div>
    );
};

export default DropDownMenu;