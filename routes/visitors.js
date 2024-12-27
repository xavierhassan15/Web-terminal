const express = require('express');
const Visitor = require('../models/visitorSchema');
const router = express.Router();

router.get('/visitors', async (req, res) => {
    try {
      const visitors = await Visitor.find();
      res.json(visitors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.get('/visitors/:id', async (req, res) => {
    try {
      const visitor = await Visitor.findById(req.params.id);
      if (!visitor) return res.status(404).json({ error: 'Visitor not found' });
      res.json(visitor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.post('/visitors', async (req, res) => {
    try {
      const visitor = new Visitor(req.body);
      await visitor.save();
      res.status(201).json(visitor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.put('/visitors/:id', async (req, res) => {
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

router.delete('/visitors/:id', async (req, res) => {
    try {
      const visitor = await Visitor.findByIdAndDelete(req.params.id);
      if (!visitor) return res.status(404).json({ error: 'Visitor not found' });
      res.json({ message: 'Visitor deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

module.exports = router;