const express = require("express");
const router = new express.Router();

const { saveTasksController } = require("../controllers/taskController");

const auth = require("../middleware/auth");

router.post("/saveTasks", auth, saveTasksController);

module.exports = router;
