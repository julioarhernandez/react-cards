import React, { Component } from 'react';
class Header extends Component {

  constructor(props) {
    super(props);
    this.state ={
      link: ''
    };
  }
  
  render() {
    return (
      <div className="banner-header">
        <a href="https://dealby.us/" title="Go Home" alt="Go home">
          <img src="../logo-white.svg" alt="DealBy logo - The best deals nearby" /></a>
        { this.props.showBack && this.props.showBack.length && 
            <a href={"https://dealby.us/showvenue/" + this.props.showBack[0].veSlug } title="Go to deals list" alt="Go to deals list"><span className="hidden">Go Back</span><span className="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></a>
        }
        { this.props.showRefresh && 
            <a href={"https://dealby.us/"} title="Refresh Deals" alt="Refresh deals"><span className="hidden">Refresh</span><span className="glyphicon glyphicon-refresh" aria-hidden="true"></span></a>
        }
      </div>

    );
  }
}

export default Header;
