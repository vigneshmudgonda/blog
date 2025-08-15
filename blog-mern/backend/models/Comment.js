const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
  name: String,
  content: String,
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Comment', commentSchema);
