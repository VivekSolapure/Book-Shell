import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <Link to={`books/${book.isbn}`}>
      <div className="rounded-xl shadow-lg p-4 bg-white hover:shadow-2xl transition border-2 border-transparent hover:border-pink-400 hover:scale-105 duration-200">
        <img
          src={book.thumbnailUrl}
          alt={book.title}
          className="h-44 object-contain mx-auto rounded"
        />
        <h3 className="font-bold text-lg mt-3 text-blue-700">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-1">by {book.authors?.join(', ')}</p>
        <p className="text-xs text-purple-500">{book.categories?.join(', ')}</p>
      </div>
    </Link>
  );
};

export default BookCard;