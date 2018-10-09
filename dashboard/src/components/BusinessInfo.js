import React, { Component } from 'react';

class BusinessInfo extends Component {
  render() {
    return(
      <div className="businessInfo">
        <div className="container">
            <div className="businessInfo-header">
                Business Information
            </div>
            <div className="businessInfo-body">
                    <ul className="list -horizontal">
                        <li className="list-item">
                            <div className="businessInfo-body-left">
                                Name
                            </div>
                            <div className="businessInfo-body-right">
                                Pollo tropical
                            </div>
                        </li>
                        <li className="list-item">
                            <div className="businessInfo-body-left">
                                Address
                            </div>
                            <div className="businessInfo-body-right">
                                122nd ave. 23 st, Miami, Florida
                            </div>
                        </li>
                        <li className="list-item">
                            <div className="businessInfo-body-left">
                                Venue
                            </div>
                            <div className="businessInfo-body-right">
                                Las americas Shoppping Plaza
                            </div>
                        </li>
                        <li className="list-item">
                            <div className="businessInfo-body-left">
                                Webpage
                            </div>
                            <div className="businessInfo-body-right">
                                www.business.com
                            </div>
                        </li>
                        <li className="list-item">
                            <div className="businessInfo-body-left">
                                Rank in Mall
                            </div>
                            <div className="businessInfo-body-right">
                                3
                            </div>
                        </li>
                    </ul>
            </div>
        </div>
      </div>
  );
  }
}

export default BusinessInfo;
