const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// POST - Submit new review
router.post('/', async (req, res) => {
  try {
    const { name, review, rating } = req.body;
    const newReview = new Review({ name, review, rating });
    await newReview.save();
    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error submitting review' });
  }
});

// GET - Fetch all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

module.exports = router;
