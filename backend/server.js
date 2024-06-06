const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for / route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve login.html for /login route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve home.html for /home route
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/referralDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch(err => console.log(err));
