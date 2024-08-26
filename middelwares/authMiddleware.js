import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; 

export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Access denied: no token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Invalid token:', err.message);
      return res.status(403).json({ message: 'Forbidden: invalid token' });
    }
    req.user = user;
    next();
  });
};

export const verifyRole = (roles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Access denied: no token provided' });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied: role not authorized' });
      }
      
      req.user = user; 
      next();
    } catch (err) {
      console.log('Unauthorized:', err.message);
      res.status(401).json({ message: 'Unauthorized: invalid token or error' });
    }
  };
};

export const verifyAdmin = verifyRole(['admin']);
export const verifyEnseignant = verifyRole(['enseignant']);
