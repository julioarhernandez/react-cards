import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div class="banner-header">
        { this.props.showBack && 
            <a href="javascript: history.back()"><span class="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"></span></a>
        }
        <img src="../logo-linear.svg" />
      </div>

    );
  }
}

export default Header;
