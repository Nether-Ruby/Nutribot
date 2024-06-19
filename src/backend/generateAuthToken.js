import jwt from 'jsonwebtoken';

const generateAuthToken = (userId) => {
  return jwt.sign({ userId }, 'aguante_linux', { expiresIn: '1h' });
};

export default generateAuthToken;