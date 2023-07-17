const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Use Routes
app.use(authRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
