const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Get all reviews for a book
router.get('/:isbn', async (req, res) => {
  const reviews = await Review.find({ bookId: req.params.isbn }).populate('user', 'name');
  res.json(reviews);
});

// Add a review (requires auth)
router.post('/:isbn', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    console.log('user:', user);
    if (!user) return res.status(401).json({ msg: 'Invalid user' });

    const review = new Review({
      bookId: req.params.isbn,
      user: user._id,
      content: req.body.content,
      username: user.username
    });
    await review.save();
    console.log('Saved review:', review);
    res.status(201).json(review);
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
});

module.exports = router;