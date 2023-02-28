const express = require("express");
const router = new express.Router();

const { signInController, signUpController } = require("../controllers/userController");

router.post("/signin", signInController);
router.post("/signup", signUpController);

module.exports = router;
