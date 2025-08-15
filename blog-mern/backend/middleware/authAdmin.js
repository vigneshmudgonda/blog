// backend/middleware/authAdmin.js
module.exports = function (req, res, next) {
  try {
    // If the user role is not admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied: Admins only' });
    }
    next();
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
