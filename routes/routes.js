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
  loginWithAuth,
} = require('../controllers/user.controller');

const {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/news.controller');

const checkUser = require('../middleware/checkUser');

router.get('/test', getAllUsers);
router.get('/news', checkUser, getAllNews);
router.get('/profile', checkUser, getAllProfile);
router.get('/:id', getOneUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);
router.post('/', createUser);
router.post('/login', loginUser);
router.post('/loginauth', loginWithAuth);

//

router.post('/news', checkUser, createNews);
router.patch('/news/:id', checkUser, updateNews);
router.delete('/news/:id', checkUser, deleteNews);

module.exports = router;
