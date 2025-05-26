import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewForm from '../components/ReviewForm';
import { UserContext } from '../context/UserContext';

const BookDetailPage = () => {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(UserContext);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const fetchBookAndReviews = async () => {
      try {
        const bookRes = await axios.get(`api/books/${isbn}`);
        setBook(bookRes.data);

        const reviewRes = await axios.get(`/api/reviews/${isbn}`);        
        setReviews(reviewRes.data);
      } catch (error) {
        console.error('Error fetching book or reviews:', error);
      }
    };

    fetchBookAndReviews();
  }, [isbn]);

  const addReview = async (reviewText) => {
    try {
      await axios.post(
        `/api/reviews/${isbn}`,
        { content: reviewText },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      const updatedReviews = await axios.get(`/api/reviews/${isbn}`);
      setReviews(updatedReviews.data);
    } catch (err) {
      console.error('Error posting review:', err);
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <img src={book.thumbnailUrl} alt={book.title} className="w-40 my-4" />
      <p className="text-gray-600">By {book.authors?.join(', ')}</p>
      <p className="text-sm mt-2">{book.longDescription || 'No description available.'}</p>

      <hr className="my-4" />

      <h2 className="text-xl font-semibold">Reviews</h2>
      {reviews.length === 0 ? (
        <div>
          <p>No reviews yet.</p>
          {user ? (
            <ReviewForm onSubmit={addReview} />
          ) : (
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setShowLoginPopup(true)}
            >
              Login to write a review
            </button>
          )}
        </div>
      ) : (
        <ul className="mt-2 space-y-2">
          {reviews.map((r) => (
            <li key={r._id} className="border p-2 rounded">
              <strong>{r.username || 'Anonymous'}:</strong> {r.content}
            </li>
          ))}
        </ul>
      )}

      {reviews.length > 0 && (
        user ? (
          <div className="mt-4">
            <ReviewForm onSubmit={addReview} />
          </div>
        ) : (
          <div className="mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setShowLoginPopup(true)}
            >
              Login to write a review
            </button>
          </div>
        )
      )}

      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-2">Login Required</h3>
            <p className="mb-4">You must be logged in to write a review.</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                setShowLoginPopup(false);
                window.location.href = '/login'; // or use navigate('/login')
              }}
            >
              Go to Login
            </button>
            <button
              className="ml-2 px-4 py-2 rounded border"
              onClick={() => setShowLoginPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailPage;