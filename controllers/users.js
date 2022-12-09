const bcrypt = require('bcrypt');
const Users = require('../models/user');
const ErrorNotFound = require('../errors/ErrorNotFound');

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Ошибка по-умолчанию.' }));
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => Users.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.getUserId = (req, res) => {
  Users.findById(req.params.userId)
    .orFail(() => {
      throw new ErrorNotFound('Пользователь по указанному _id не найден.');
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.errorMessage });
      }
      return res.status(500).send({ message: 'Ошибка по-умолчанию' });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new ErrorNotFound('Пользователь по указанному _id не найден.');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.errorMessage });
      }
      return res.status(500).send({ message: 'Ошибка по-умолчанию.' });
    });
};

module.exports.updateAvatar = (req, res) => {
  Users.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new ErrorNotFound('Пользователь по указанному _id не найден.');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.errorMessage });
      }
      return res.status(500).send({ message: 'Ошибка по-умолчанию.' });
    });
};
