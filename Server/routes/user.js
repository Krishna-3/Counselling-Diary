const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const refreshTokenController = require('../controller/refreshTokenController');

router.post("/signup$", userController.handleSignup);

router.post("/login$", userController.handleLogin);

router.get('/refresh$', refreshTokenController.handleRefreshToken);

router.post("/logout$", userController.handleLogout);

module.exports = router;
