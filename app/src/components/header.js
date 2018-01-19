import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="banner-header">
        { this.props.showBack && 
            <a href="javascript: history.back()"><span className="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"></span></a>
        }
        <img src="../logo-white.svg" />
      </div>

    );
  }
}

export default Header;
