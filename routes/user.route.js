const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getOneUser,
  deleteUser,
  updateUser,
  loginUser,
  getAllProfile,
  getAllNews,
  createNews,
} = require('../controllers/user.controller');

const checkUser = require('../middleware/checkUser');

router.get('/', getAllUsers);
router.get('/news', getAllNews);
router.get('/profile', checkUser, getAllProfile);
router.get('/:id', getOneUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);
router.post('/', createUser);
router.post('/news', createNews);
router.post('/login', loginUser);

module.exports = router;
