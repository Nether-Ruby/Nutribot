import jwt from 'jsonwebtoken';
import config from "../../configs.js";
const { SECRET_JWT_KEY} = config;

const generateAuthToken = (userId, name, email) => {
  return jwt.sign({ userId, name, email}, SECRET_JWT_KEY, { expiresIn: '24h' });
};

export default generateAuthToken;