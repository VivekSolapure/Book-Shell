const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/reviewRoutes');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors(
  {
    origin : ["https://book-shell-89u7.vercel.app"],
    methods: ["POST","GET","PUT"],
    credentials: true
  }
));
app.use(bodyParser.json());

app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('Server is successfully deployed and running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
