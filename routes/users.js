const router = require('express').Router();
const {
  getUsers,
  getUserId,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUserId);

router.patch('/me', updateUserInfo);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
