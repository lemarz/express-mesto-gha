const jwt = require('jsonwebtoken');
const ErrorWrongCredentials = require('../errors/ErrorWrongCredentials');

const { JWT_SECRET = 'your-secret-key' } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401).send({ message: 'Необходима авторизация' });
    throw new ErrorWrongCredentials('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    res.status(401).send({ message: 'Необходима авторизация' });
    throw new ErrorWrongCredentials('Необходима авторизация');
  }

  req.user = payload;
  next();
};

module.exports = auth;
