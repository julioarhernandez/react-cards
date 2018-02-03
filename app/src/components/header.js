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
        <img src="../logo-white.svg" alt="DealBy logo - The best deals nearby" />
        { this.props.showBack && this.props.showBack.length && 
            <a href={"https://dealby.us/showvenue/" + this.props.showBack[0].veSlug } title="Go to deals list" alt="Go to deals list"><span className="hidden">Go Back</span><span className="glyphicon glyphicon-home" aria-hidden="true"></span></a>
        }
      </div>

    );
  }
}

export default Header;
