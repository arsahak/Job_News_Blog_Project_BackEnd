const express = require("express");
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
} = require("../controllers/user.controller");

const {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
} = require("../controllers/news.controller");

const checkUser = require("../middleware/checkUser");
const {
  getAllCategorys,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const {
  getAllSaveNews,
  saveNews,
  deletedAllNews,
} = require("../controllers/newsave.controller");

//user route

router.get("/users", getAllUsers);
router.get("/news", checkUser, getAllNews);
router.get("/profile", checkUser, getAllProfile);
router.get("/users/:id", getOneUser);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id", updateUser);
router.post("/users", createUser);
router.post("/login", loginUser);
router.post("/loginauth", loginWithAuth);

// news route

router.post("/news", checkUser, createNews);
router.patch("/news/:id", checkUser, updateNews);
router.delete("/news/:id", checkUser, deleteNews);

// news category route
router.get("/category", getAllCategorys);
router.post("/category", createCategory);
router.patch("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

// news save route
router.get("/newssave", checkUser, getAllSaveNews);
router.post("/newssave", checkUser, saveNews);
router.delete("/newssave", checkUser, deletedAllNews);

module.exports = router;
