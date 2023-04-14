import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search !== "") {
      setLoading(true);
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40&printType=BOOKS`)
        .then((response) => {
          setBooks(response.data.items);
          setLoading(false);
          console.info(search);
          console.info(response);
          console.info(response.data);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [search]);

  const handleSearch = () => {
    if (author === "") {
      setSearch(`intitle:${title}`);
    }
    else if (title === "") {
      setSearch(`inauthor:${author}`);
    }
    else {
      setSearch(`inauthor:${author}+intitle:${title}`);
    }
  };

  return (
    <div>
      <h1>Buscador de Libros</h1>
      <div className='inputs'>
        <input type="text" id="title" placeholder='Título' value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className='inputs'>
        <input type="text" id="author" placeholder='Autor' value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div className='inputs'><button onClick={handleSearch}>Buscar</button></div>

      {loading ? (
        <p>Cargando libros...</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <p><a className='enlace' href={book.volumeInfo.infoLink}>{book.volumeInfo.title}</a> - {book.volumeInfo.authors}</p>
              {book.volumeInfo.imageLinks ? (
                <a href={book.volumeInfo.infoLink}><img src={book.volumeInfo.imageLinks.thumbnail} alt="book cover" /></a>
              ) : (
                <p>No image available</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;