import React from 'react'
import { Link } from 'react-router-dom'
import SearchResults from './SearchResults'
import './App.css'

const SearchQuery = (props) => {
  return (
    <div>
      <div className="search-books-bar">
        <Link className="close-search" to='/'>Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={(event) => props.searchBooks(event.target.value,20)}
            />
        </div>
      </div>
       < SearchResults
            updateBookSelection={props.updateBookSelection}
            bookReturns={props.bookReturns}
        />
    </div>
  )
}

export default SearchQuery