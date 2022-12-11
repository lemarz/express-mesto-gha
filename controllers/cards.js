const Cards = require('../models/card');
const ErrorNotFound = require('../errors/ErrorNotFound');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Ошибка по-умолчанию.' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new ErrorNotFound('Передан несуществующий _id карточки.');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка.' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.errorMessage });
      }
      return res.status(500).send({ message: 'Ошибка по-умолчанию.' });
    });
};

module.exports.disLikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new ErrorNotFound('Передан несуществующий _id карточки.');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка.' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.errorMessage });
      }
      return res.status(500).send({ message: 'Ошибка по-умолчанию.' });
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findById(req.params.cardId)
    .orFail(() => {
      throw new ErrorNotFound('Передан несуществующий _id карточки.');
    })
    .then((card) => {
      if (req.user._id !== card.owner.toString()) {
        return res.status(500).send({ message: 'Вы не можете удалять чужие карточки.' });
      }
      return String(card._id);
    })
    .then((id) => Cards.findByIdAndRemove(id))
    .then((cardToRemove) => res.send({ data: cardToRemove }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные.' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.errorMessage });
      }
      return res.status(500).send({ message: 'Ошибка по-умолчанию.' });
    });
};
