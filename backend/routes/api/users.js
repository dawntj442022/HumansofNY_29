const express = require("express");
const router = express.Router();

const {
  checkToken,
  dataController,
  apiController,
} = require("../../controllers/api/usersController");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

//show all users
router.get("/all", dataController.findAll);

// POST /api/users
router.post("/", dataController.create, apiController.auth);

// Post /api/users/login
router.post("/login", dataController.login, apiController.auth);

// Get /api/users/check-token
router.get("/check-token", ensureLoggedIn, checkToken);

// POST /api/users/signup
router.post("/signup", dataController.createUser, apiController.auth);

module.exports = router;
