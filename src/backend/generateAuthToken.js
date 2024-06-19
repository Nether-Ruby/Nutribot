import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../../configs.js';

const generateAuthToken = (userId, name, email) => {
  return jwt.sign({ userId, name, email}, SECRET_JWT_KEY, { expiresIn: '1h' });
};

export default generateAuthToken;