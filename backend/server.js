const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/thumbnails', express.static('thumbnails'));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
