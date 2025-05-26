// src/components/ReviewForm.jsx
import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(review);
    setReview('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
        className="w-full p-2 border rounded"
        rows={4}
        required
      />
      <button type="submit" className="bg-blue-600 text-white mt-2 px-4 py-2 rounded">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
