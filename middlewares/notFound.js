const notFound = (req, res, next) => {
  res.status(404).send({ message: 'Данный путь не найден' });
  next();
};

module.exports = notFound;
