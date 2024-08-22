import jwt from 'jsonwebtoken';
import User from '../models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; 

export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
};

export const verifyRole = (roles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied: role not authorized' });
      }
      
      req.user = user; 
      next();
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
};

export const verifyAdmin = verifyRole(['admin']);
export const verifyEnseignant = verifyRole(['enseignant']);
