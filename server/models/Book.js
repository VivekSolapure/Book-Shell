const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  isbn: String,
  pageCount: Number,
  publishedDate: Date,
  thumbnailUrl: String,
  status: String,
  authors: [String],
  categories: [String],
}, { strict: false });

module.exports = mongoose.model('Book', bookSchema, "Book");
