const express = require('express');
const Review = require('../models/reviewSchema');
const router = express.Router();

router.get('/reviews', async (req, res) => {
    try {
      const reviews = await Review.find()
        .populate('visitor')
        .populate('attraction');
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  
router.delete('/reviews/:id', async (req, res) => {
    try {
      const review = await Review.findByIdAndDelete(req.params.id);
      if (!review) return res.status(404).json({ error: 'Review not found' });
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.post('/reviews', async (req, res) => {
    const { visitorId, attractionId, score, comment } = req.body;
    try {
        const visitor = await Visitor.findById(visitorId);
        if (!visitor) return res.status(404).json({ error: 'Visitor not found' });

        const attraction = await Attraction.findById(attractionId);
        if (!attraction) return res.status(404).json({ error: 'Attraction not found' });

        const existingReview = await Review.findOne({ visitor: visitorId, attraction: attractionId });
        if (existingReview) return res.status(400).json({ error: 'You have already reviewed this attraction' });

        const hasVisited = visitor.visits.includes(attractionId); // Assuming 'visits' is an array of visited attraction IDs for the visitor

        if (!hasVisited) return res.status(400).json({ error: 'You must visit the attraction before reviewing' });

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

module.exports = router;