const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const attractionRoutes = require('./routes/attraction');
const reviewRoutes = require('./routes/review');
const visitorRoutes = require('./routes/visitors');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Web-Terminal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

app.use(attractionRoutes);
app.use(reviewRoutes);
app.use(visitorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});