import React from 'react'
import './App.css'

const Book = (props) => {
  return (
    <li>
        <div className="book">
          <div className="book-top">
            {props.book.imageLinks ? (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks.thumbnail})` }}></div>)
              : (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage:'url(../no-cover.jpg)' }}></div>)}
            <div className="book-shelf-changer">
              <select defaultValue={props.book.shelf} onChange={(event)=>props.updateBookSelection(props.book, event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
            <div className="book-title">{props.book.title}</div>
            {props.book.authors ? (props.book.authors.map((author)=>(
              <div key={author} className="book-authors">{author}</div>))) : (<div></div>)}
          </div>
    </li>
  )
}

export default Book