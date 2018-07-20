import React from 'react';

const Footer = () => {
    return (
        <div className="banner-footer">
        {/* <img src="../logo-white.svg" /> */}
        <ul>
            <li><a href="https://bizmarketing.us/en/contactanos-campana-publicitaria/" target="_blank" rel="noopener noreferrer" >Support</a></li>
            <li><a href="http://bizmarketing.us/politica-terminos/" target="_blank" rel="noopener noreferrer">Terms of use</a></li>
            <li><a href="https://bizmarketing.us/en/privacy-policy-dealby/" target="_blank" rel="noopener noreferrer">Privacy policy</a></li>
            <li><a href="https://bizmarketing.us/en/dealby-mejores-ofertas/" target="_blank" rel="noopener noreferrer" >know more</a></li>
        </ul>
        <div className="legal">DealBy is a product of <a href="https://bizmarketing.us/" target="_blank" rel="noopener noreferrer" >Bizmarketing.us L.L.C</a> © 2018 </div>
        {/* <div className="legal"> All rights reserved. </div> */}
      </div>
    );
};

export default Footer;
