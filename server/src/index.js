require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api.routes');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});