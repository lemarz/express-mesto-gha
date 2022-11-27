const router = require('express').Router();
const {
  getCards,
  getCardId,
  createCard,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.get('/:cardId', getCardId);

router.post('/', createCard);

router.put('/:cardId/likes', likeCard);

router.delete('/:cardId/likes', disLikeCard);

module.exports = router;
