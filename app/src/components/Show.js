import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      card: {}
    };
  }

  componentDidMount() {
    axios.get('/api/card/'+this.props.match.params.id)
      .then(res => {
        this.setState({ card: res.data });
        //console.log(this.state.card);
      });
  }

  delete(id){
    console.log(id);
    axios.delete('/api/card/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              {this.state.card.title}
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> card List</Link></h4>
            <dl>
              <dt>ISBN:</dt>
              <dd>{this.state.card.isbn}</dd>
              <dt>Author:</dt>
              <dd>{this.state.card.author}</dd>
              <dt>Description:</dt>
              <dd>{this.state.card.description}</dd>
              <dt>Publish Date:</dt>
              <dd>{this.state.card.published_year}</dd>
              <dt>Publisher:</dt>
              <dd>{this.state.card.publisher}</dd>
            </dl>
            <Link to={`/edit/${this.state.card._id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.card._id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
