const router = require('express').Router();
const { getCards, getCardId, createCard } = require('../controllers/cards');

router.get('/', getCards);

router.get('/:cardId', getCardId);

router.post('/', createCard);

module.exports = router;
