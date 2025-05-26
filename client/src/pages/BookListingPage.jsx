import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const BookListingPage = ({ searchTerm = '', filter = '' }) => {
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        let res;
        if (searchTerm) {
          res = await axios.get(`/api/books/search?query=${encodeURIComponent(searchTerm)}`);
          setBooks(res.data.books);
          setTotalPages(1);
          setCurrentPage(1);
        } else if (filter) {
          res = await axios.get(`/api/books/filter?category=${encodeURIComponent(filter)}`);
          setBooks(res.data.books);
          setTotalPages(1);
          setCurrentPage(1);
        } else {
          res = await axios.get(`/api/books?page=${currentPage}`);
          setBooks(res.data.books);
          setTotalPages(res.data.totalPages);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, [currentPage, searchTerm, filter]);

  const filteredBooks = books.filter((book) => {
    if (!filter) return true;
    if (!book.categories) return false;
    return book.categories.some(
      (cat) => cat.trim().toLowerCase() === filter.trim().toLowerCase()
    );
  });

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
          {!searchTerm && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span className="px-3 py-1">{currentPage} / {totalPages}</span>
              <button
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookListingPage;