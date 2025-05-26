const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.get('/', async (req, res) => {
  const { page = 1, limit = 12 } = req.query;
  try {
    const books = await Book.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await Book.countDocuments();
    
    res.json({ totalPages: Math.ceil(count / limit), currentPage: page, books });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/search', async (req, res) => {
  const query = req.query.query || '';
  try {
    const books = await Book.find({
      title: { $regex: query, $options: 'i' }
    }).limit(50);
    res.json({ books });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/filter', async (req, res) => {
  const category = req.query.category || '';
  try {
    const books = await Book.find({
      categories: { $elemMatch: { $regex: category, $options: 'i' } }
    }).limit(50);
    res.json({ books });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/:isbn', async (req, res) => {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
