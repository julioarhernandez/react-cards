import React, { Component } from 'react';

class BusinessInfo extends Component {
    // constructor(props) {
    //     super(props);
    //     const { bizName, bizLogo, ...other} = props;
    //     console.log( `${bizName}`);
    //   }
    
  render() {
    return(
      <div className="businessInfo">
        <div className="container">
            <div className="businessInfo-header">
                <img src={this.props.bizLogo} alt={this.props.bizName} />
                {this.props.bizName}
            </div>
            <div className="businessInfo-body">
                <a href="//">Show Cards</a>
            </div>
        </div>
      </div>
  );
  }
}

export default BusinessInfo;
