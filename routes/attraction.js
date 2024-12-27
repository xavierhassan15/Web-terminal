const express = require('express');
const router = express.Router();
const Attraction = require('../models/attractionSchema');

router.get('/attractions', async (req, res) => {
    try {
        const attractions = await Attraction.find();
        res.json(attractions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/attractions/:id', async (req, res) => {
    try {
        const attraction = await Attraction.findById(req.params.id);
        if (!attraction) return res.status(404).json({ error: 'Attraction not found' });
        res.json(attraction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/attractions', async (req, res) => {
    try {
        const attraction = new Attraction(req.body);
        await attraction.save();
        res.status(201).json(attraction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/attractions/:id', async (req, res) => {
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

router.delete('/attractions/:id', async (req, res) => {
    try {
        const attraction = await Attraction.findByIdAndDelete(req.params.id);
        if (!attraction) return res.status(404).json({ error: 'Attraction not found' });
        res.json({ message: 'Attraction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;