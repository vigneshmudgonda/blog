const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();

// get comments for blog
router.get('/:blogId', async (req, res) => {
  const comments = await Comment.find({ blogId: req.params.blogId }).sort({ date: -1 });
  res.json(comments);
});

// post comment
router.post('/', async (req, res) => {
  const { blogId, name, content } = req.body;
  const comment = await Comment.create({ blogId, name, content });
  res.status(201).json(comment);
});

module.exports = router;
