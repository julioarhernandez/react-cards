import React, { Component } from 'react';
import { Link } from "react-router-dom";
import imageSrc from "./images/emptyImage.png";

class DealDetail extends Component {
    constructor(){
        super();
        this.state = {
            user: '',
          };

    }

    componentDidMount () {
        const handle = this.props.dealId;
        console.log(handle);
        

        // fetch(`https://api.twitter.com/user/${handle}`)
        //     .then((user) => {
        //     this.setState(() => ({ user }))
        //     })
        }
  render() {
    return(
      <div className="DealsCards">
        <div className="container">
            <div className="DealsCards-item -border-blue-light">
                <div className="DealsCards-header">
                    <div className="DealsCards-image">
                        <figure>
                            <img src={imageSrc} alt=""/>
                        </figure>
                    </div>
                </div>
                <div className="DealsCards-body">
                    <div className="DealsCards-title">
                        <h1>Title of the deal you are displaying in the real cards</h1>
                    </div>
                    <div className="DealsCards-description">
                        <h2>Description of the deal you are displaying in the real cards wityh ellipsis at the end</h2>
                    </div>
                </div>
                <div className="DealsCards-aside">
                    <Link to="/deals/12313123123" className="btn btn-blue -inline">
                        Save Changes
                    </Link>
                </div>
            </div>
        </div>
      </div>
  );
  }
}

export default DealDetail;
