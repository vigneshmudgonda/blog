const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

// Create Blog
router.post('/',async (req, res) => {
  try {
    const { title, content, image, category, tags } = req.body;
    const newBlog = new Blog({ title, content, image, category, tags });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/blogs with search, filter, pagination
router.get('', async (req, res) => {
  try {
    const { q, category, tags, page = 1, limit = 10 } = req.query;

    const filter = {};

    // Search title or content or category (case-insensitive)
    if (q) {
      const regex = new RegExp(q, 'i');
      filter.$or = [
        { title: regex },
        { content: regex },
        { category: regex },
      ];
    }

    // Filter by exact category
    if (category) filter.category = category;

    // Filter by tags (tags as array)
    if (tags) {
      filter.tags = { $in: tags.split(',').map((t) => t.trim()) };
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Blog.countDocuments(filter);

    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 }) // or date field you use for sorting
      .skip(skip)
      .limit(limitNum);

    res.json({
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      blogs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Single Blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Blog
router.put('/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Blog
router.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
