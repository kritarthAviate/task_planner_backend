const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: false,
        },
    },
    { timestamps: true },
);

userSchema.methods.generateAuthToken = function () {
    const user = this;
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ _id: user._id.toString() }, secret, { expiresIn: "2h" });

    return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
