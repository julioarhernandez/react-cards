import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {

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
        console.log(this.state.card);
      });
  }

  onChange = (e) => {
    const state = this.state.card
    state[e.target.name] = e.target.value;
    this.setState({card:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { isbn, title, author, description, published_year, publisher } = this.state.card;

    axios.put('/api/card/'+this.props.match.params.id, { isbn, title, author, description, published_year, publisher })
      .then((result) => {
        this.props.history.push("/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT card
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.card._id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> card List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="isbn">ISBN:</label>
                <input type="text" class="form-control" name="isbn" value={this.state.card.isbn} onChange={this.onChange} placeholder="ISBN" />
              </div>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={this.state.card.title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="author">Author:</label>
                <input type="text" class="form-control" name="author" value={this.state.card.author} onChange={this.onChange} placeholder="Author" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <input type="text" class="form-control" name="description" value={this.state.card.description} onChange={this.onChange} placeholder="Description" />
              </div>
              <div class="form-group">
                <label for="published_date">Published Date:</label>
                <input type="number" class="form-control" name="published_year" value={this.state.card.published_year} onChange={this.onChange} placeholder="Published Year" />
              </div>
              <div class="form-group">
                <label for="publisher">Publisher:</label>
                <input type="text" class="form-control" name="publisher" value={this.state.card.publisher} onChange={this.onChange} placeholder="Publisher" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
