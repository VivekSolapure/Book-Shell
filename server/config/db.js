require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../models/Book');


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { /* options */ });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
