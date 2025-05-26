import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/api/books')
      .then(res => setBooks(res.data.books))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Book List</h2>
      <ul>
        {books.map(book => (
          <li key={book._id} className="my-2">
            <img src={book.thumbnailUrl} alt={book.title} className="w-16 inline-block mr-2" />
            <strong>{book.title}</strong> by {book.authors.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}
