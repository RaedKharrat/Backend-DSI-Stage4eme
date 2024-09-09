// services/authService.js
import bcrypt from 'bcryptjs';

function hashPassword(password) {
  if (typeof password !== 'string') {
    throw new TypeError('Password must be a string');
  }
  return bcrypt.hashSync(password, 10);
}

export { hashPassword };
