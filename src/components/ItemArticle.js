import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class ItemArticle extends Component {
  render() {
    return (
      <div className="card mb-2 mt-2">
        <img className="card-img-top" src={this.props.imgUrl} />
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <p className="card-text">{this.props.text}</p>

          <a href={this.props.fullUrl} target="_bank" className="btn btn-primary">Читать</a>
        </div>
      </div>
    );
  }
}

export default ItemArticle;
