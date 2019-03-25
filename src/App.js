import React, { Component } from 'react';
import './App.css';
import BookList from './BookList'

class App extends Component {


constructor(props) {
    super(props)
    this.state = {
        value:'',
        priceFilter:'All',
        bookFilter:'All',
        books:[]
    }
    this.handleChange = this.handleChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this); 
  }




  handleChange(event){
    this.setState({value:event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    fetch('https://www.googleapis.com/books/v1/volumes?q=' + this.state.value)
    .then(res => res.json())
    .then(res =>{
    
      let books_arr =[];
      for(let x = 0; x< res.items.length;x++){
        let curr_item = res.items[x]
        let item_price = 'Not for Sale';
        if(curr_item.saleInfo.saleability === 'FOR_SALE')
        {
          item_price = curr_item.saleInfo.listPrice.amount;
        }

        let book_obj = {
          printType: curr_item.volumeInfo.printType,
          title: curr_item.volumeInfo.title,
          description: curr_item.volumeInfo.description,
          authors: curr_item.volumeInfo.authors,
          price: item_price,
          thumbnail: curr_item.volumeInfo.imageLinks.thumbnail
        };
        books_arr.push(book_obj);
      }

      this.setState({
        books: books_arr
      })
     // console.log(res.items[0].volumeInfo.printType)
     // console.log(res.items[0].volumeInfo.title);
     // console.log(res.items[0].volumeInfo.authors[0]);
     // console.log(res.items[0].volumeInfo.description);
     // console.log(res.items[0].saleInfo.saleability);
    //console.log(res.items[0].saleInfo.saleability);
      }
    );
    
  }

  handleFilterChange(event){
   console.log(event.target.value);
   if(event.target.id === "price")
   {
     this.setState({
       priceFilter:event.target.value
     })
   }
   else{
     this.setState({
       bookFilter:event.target.value
     })
   }

  }

  generateForms(){
    return (
      <div>

      <form onSubmit={this.handleSubmit}>
      <label htmlFor="Search Books">Search Books: </label>
        <input type="text" value= {this.state.value} onChange={this.handleChange} />
        <input type ="submit" value="Submit"/>
      </form>

      <section>
      <label htmlFor="price">Price Filter: </label>
      <select id = "price" onChange ={this.handleFilterChange}>
      <option>All</option>
      <option>For Sale Only</option>
      </select>

      <label htmlFor="book-filter">Book Filter: </label>
      <select id = "book-filter" onChange ={this.handleFilterChange}>
      <option> All </option>
      <option> Books </option>
      <option>Magazines</option>
      </select>
      </section>
      </div>
    );
  }

  render() {

    let filtered_books = this.state.books.filter(book =>{
      if(this.state.priceFilter === "For Sale Only")
        { console.log("filter is here");
          return book.price !== "Not for Sale";
        }
        else{
        return true;
        }

      }).filter(book => {

        if(this.state.bookFilter === "Books")
        {
          return book.printType === "BOOK";
        }
        else if(this.state.bookFilter === "Magazines")
        {
          return book.printType === "MAGAZINE";
        }
        else{
          return true;
        }

      })

      console.log("rendering");


    return (
      <div className="App">
      {/* Input Section */}
      {this.generateForms()}
      {/* End of Input Section */}
      
       {this.state.books.length !== null && (<BookList books = {filtered_books} priceFilter = {this.state.priceFilter} bookFilter = {this.state.BookFilter} />)}  
      
      </div>


    );
  }


}

export default App;
