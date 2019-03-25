import React, { Component } from 'react';
import Book from './Book'

class BookList extends Component {

  render() {
    
   

    return (
       <ul>
            {this.props.books.map((book,index) => {
                return <Book key = {index} book = {book} />
            })}
            </ul>
    );
  }


}

export default BookList;
