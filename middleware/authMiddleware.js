const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next,users) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, 'secret_key');
    const user = users.find(u => u.username === decoded.username);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
