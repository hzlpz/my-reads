import React from 'react'
import Book from './Book'
import './App.css'

const SearchResults = (props) => {
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {props.bookReturns.map((book) => (
          <Book
            key={book.id}
            book={book}
            updateBookSelection={props.updateBookSelection}
          />
        ))}
      </ol>
    </div>
  )
}

export default SearchResults

