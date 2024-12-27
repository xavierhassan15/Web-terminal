const express = require('express');
const mongoose = require('mongoose');

const Attraction = require('./models');
const Visitor = require('./models');
const Review = require('./models');

const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/Turism-management-system') 
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

const app = express();

app.use(express.json());

app.get('/attractions', async (req, res) => {
    try {
        const attractions = await Attraction.find();
        res.json(attractions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/attractions/:id', async (req, res) => {
    try {
        const attraction = await Attraction.findById(req.params.id);
        if (!attraction) return res.status(404).json({ error: 'Attraction not found' });
            res.json(attraction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/attractions', async (req, res) => {
    try {
        const attraction = new Attraction(req.body);
        await attraction.save();
        res.status(201).json(attraction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/attractions/:id', async (req, res) => {
    try {
        const attraction = await Attraction.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        });
        if (!attraction) return res.status(404).json({ error: 'Attraction not found' });
        res.json(attraction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/attractions/:id', async (req, res) => {
    try {
        const attraction = await Attraction.findByIdAndDelete(req.params.id);
        if (!attraction) return res.status(404).json({ error: 'Attraction not found' });
        res.json({ message: 'Attraction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/visitors', async (req, res) => {
    try {
      const visitors = await Visitor.find();
      res.json(visitors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  
app.get('/visitors/:id', async (req, res) => {
    try {
      const visitor = await Visitor.findById(req.params.id);
      if (!visitor) return res.status(404).json({ error: 'Visitor not found' });
      res.json(visitor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  
app.post('/visitors', async (req, res) => {
    try {
      const visitor = new Visitor(req.body);
      await visitor.save();
      res.status(201).json(visitor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

app.put('/visitors/:id', async (req, res) => {
    try {
      const visitor = await Visitor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!visitor) return res.status(404).json({ error: 'Visitor not found' });
      res.json(visitor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});
  
app.delete('/visitors/:id', async (req, res) => {
    try {
      const visitor = await Visitor.findByIdAndDelete(req.params.id);
      if (!visitor) return res.status(404).json({ error: 'Visitor not found' });
      res.json({ message: 'Visitor deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});  

app.get('/reviews', async (req, res) => {
    try {
      const reviews = await Review.find().populate('visitor').populate('attraction');
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  
app.delete('/reviews/:id', async (req, res) => {
    try {
      const review = await Review.findByIdAndDelete(req.params.id);
      if (!review) return res.status(404).json({ error: 'Review not found' });
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.post('/reviews', async (req, res) => {
    const { visitorId, attractionId, score, comment } = req.body;
    try {
        const visitor = await Visitor.findById(visitorId);

        if (!visitor) 
            return res.status(404).json({ error: 'Visitor not found' });

        const attraction = await Attraction.findById(attractionId);

        if (!attraction) 
            return res.status(404).json({ error: 'Attraction not found' });

        const existingReview = await Review.findOne({ visitor: visitorId, attraction: attractionId });

        if (existingReview)
            return res.status(400).json({ error: 'You have already reviewed this attraction' });

        const hasVisited = true;

        if (!hasVisited)
            return res.status(400).json({ error: 'You must visit the attraction before reviewing' });

        const review = new Review({
            visitor: visitorId,
            attraction: attractionId,
            score,
            comment,
        });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));