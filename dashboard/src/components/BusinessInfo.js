import React, { Component } from 'react';

class BusinessInfo extends Component {
    // constructor(props) {
    //     super(props);
    //     
    //     console.log( `${bizName}`);
    //   }
    
  render() {
    const { _id, bizName, bizLogo, ...other} = this.props;
    return(
      <div className="businessInfo">
        <div className="container">
            <div className="businessInfo-header">
                <img src={this.props.bizLogo} alt={bizName} />
            </div>
            <div className="businessInfo-body">
                {this.props.bizName}
                <a href={"/getcards/" + _id}>Show Cards</a>
            </div>
        </div>
      </div>
  );
  }
}

export default BusinessInfo;
