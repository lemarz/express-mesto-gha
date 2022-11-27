const Cards = require('../models/card');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getCardId = (req, res) => {
  Cards.findById(req.params.cardId)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send(err));
};
