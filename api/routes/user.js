const express = require("express");
const router = express.Router();
const userHandler = require("../controllers/user");

router.post("/signup", userHandler.userSignUp);

router.post("/login", userHandler.userLogin);

router.delete("/:userId", userHandler.removeUser);

module.exports = router;
