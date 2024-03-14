const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const matchRoutes = require('./routes/matchRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Use routes
app.use('/api/user', userRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/notification', notificationRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/cricketApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
