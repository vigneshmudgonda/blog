const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // hashed
  role: { type: String, default: 'admin' } // or 'user'
});
module.exports = mongoose.model('Users', userSchema);
