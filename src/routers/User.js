const express = require("express");
const router = new express.Router();

const auth = require("../middleware/auth");
const {
    signInController,
    signUpController,
    meController,
} = require("../controllers/userController");

router.post("/signin", signInController);
router.post("/signup", signUpController);

router.get("/me", auth, meController);

module.exports = router;
