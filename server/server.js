const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/reviewRoutes');
const path = require('path');
require('dotenv').config();

const app = express();
connectDB();

app.use(bodyParser.json());

app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', authRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
