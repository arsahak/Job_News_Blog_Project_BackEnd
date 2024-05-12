require('dotenv').config();
const jwt = require('jsonwebtoken');

const checkUser = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      throw new Error('Authorization header is missing');
    }
    const token = authorization.split(' ')[1]; // Split by space, not empty string
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { id, email } = decoded;
    req.id = id; // Assign decoded id to req.id
    req.email = email; // Assign decoded email to req.email
    next();
  } catch (error) {
    next('Authorization failed: ' + error.message); // Pass error message
  }
};

module.exports = checkUser;
