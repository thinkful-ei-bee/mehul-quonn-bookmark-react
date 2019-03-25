import React, { Component } from 'react';


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
        <li>
            <h1> {this.props.book.title}</h1>
            <h2>{this.props.book.authors !== undefined && author_str}</h2>
            <h3>{this.props.book.price}</h3>
            <p>{this.props.book.description}</p>
            <img src ={this.props.book.thumbnail} alt = "book-img" />
        </li>
      
    );
  }


}

export default Book;
