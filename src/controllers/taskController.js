const User = require("../Models/User");

const saveTasksController = async (req, res) => {
    try {
        const { user } = req;
        const { tasks } = req.body;
        if (!Array.isArray(tasks)) {
            throw new Error("Tasks should be an array of objects!");
        }
        if (tasks.length == 0) {
            throw new Error("Tasks array is empty!");
        }

        user.tasks = tasks;
        await user.save();

        res.status(201).json({ success: true, user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { saveTasksController };
