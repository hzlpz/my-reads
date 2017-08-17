import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import Search from './SearchQuery'
import './App.css';

class BooksApp extends Component {
    state = {
      books: [],
      bookReturns: []
  }

   updateBookSelection=(book, shelf) => {
    BooksAPI.update(book, shelf).then(res => {
      this.getTheBooks()
    })
  }

  getTheBooks=() => {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

 componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }


  searchBooks=(query, maxResults) => {
    query.length === 0 && this.setState({bookReturns: []})

    query.length > 0 &&
      BooksAPI.search(query, maxResults).then(searchedBooks => {
        if(!searchedBooks.error){
          searchedBooks.map((searchedBook) => {
            let unmatched = this.state.books.filter(book => book.id !== searchedBook.id)
            let match = this.state.books.filter(book => book.id === searchedBook.id)
            if(match.length > 0){
              return searchedBook.shelf = match[0].shelf
            }
            if(unmatched.length > 0){
              return searchedBook.shelf = 'none'
            }
          })
        }
        searchedBooks.error || searchedBooks === undefined ? (this.setState({bookReturns: []})) : (this.setState({bookReturns: searchedBooks}))
      })
  }

  render() {
    const { books, bookReturns } = this.state
    return (
      <div className="app">
        <div>
          <Route path = '/search' render ={() => (
            <div className="search-books">
              < Search
                searchBooks={this.searchBooks}
                updateBookSelection={this.updateBookSelection}
                bookReturns={bookReturns}
                books={books}
              />
            </div>
          )}/>

          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-content">
                <div>
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  < Shelf
                    title='Currently Reading'
                    updateBookSelection={this.updateBookSelection}
                    books={books.filter((book)=> book.shelf === 'currentlyReading')}
                  />
                  < Shelf
                    title='Wants To Read'
                    updateBookSelection={this.updateBookSelection}
                    books={books.filter((book)=> book.shelf === 'wantToRead')}
                  />
                  < Shelf
                    title='Read'
                    updateBookSelection={this.updateBookSelection}
                    books={books.filter((book)=> book.shelf === 'read')}
                  />
                  <Link className="open-search" to='/search'>
                    <a>Add a book</a>
                  </Link>
                </div>
              </div>
            </div>
          )}/>
        </div>
      </div>
    )
  }
}

export default BooksApp;