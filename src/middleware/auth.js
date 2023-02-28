const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
    try {
        const token = req.cookie("authToken");
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        const user = await User.findOne({
            _id: decoded._id,
        });

        if (!user) {
            throw new Error();
        }
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: "Please login first." });
    }
};

module.exports = auth;
