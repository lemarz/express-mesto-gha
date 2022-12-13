const router = require('express').Router();

const {
  cardJoiValidator,
  userIdJoiValidator,
} = require('../middlewares/joiValidator');

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', cardJoiValidator, createCard);

router.delete('/:cardId', userIdJoiValidator('userId'), deleteCard);

router.put('/:cardId/likes', userIdJoiValidator('userId'), likeCard);

router.delete('/:cardId/likes', userIdJoiValidator('userId'), disLikeCard);

module.exports = router;
