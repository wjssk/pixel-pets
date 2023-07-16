const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

require('dotenv').config();
const mongoose = require('mongoose');

app.use(cors());
app.use(helmet());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend connection successful!' });
});

app.listen(3000, function () {
  console.log('Server listening on port 3000');
});
