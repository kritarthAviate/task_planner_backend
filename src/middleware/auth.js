const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies["authToken"];
        if (!token) {
            throw new Error("jwt token not provided!");
        }
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        const user = await User.findById(decoded._id);
        if (!user) {
            throw new Error("User doesn't exist!");
        }
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: e?.message || "Please login first." });
    }
};

module.exports = auth;
