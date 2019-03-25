import React, { Component } from 'react';
import "./Book.css";

class Book extends Component {

  render() {
      let author_str = "";
if(this.props.book.authors !== undefined){
    author_str = this.props.book.authors.map((author,index) => {
        if(index !== this.props.book.authors.length-1){
            return author + ',';
        }
        else{
            return author;
        }
    })
    }

   
    return (
        <li className="book">
        <div className="first-grid-item">
        <img src ={this.props.book.thumbnail} alt = "book-img" />
        </div>
        <div className="grid-item">
        <h1>"{this.props.book.title}"</h1>
            <p>{this.props.book.authors !== undefined && author_str}</p>
            <i className="red-text">{this.props.book.price}</i>
        </div>
        <div className="grid-item"><p>{this.props.book.description}</p></div>
        </li>
      
    );
  }


}

export default Book;
