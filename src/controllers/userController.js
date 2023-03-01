const bcrypt = require("bcryptjs");
const axios = require("axios");

const User = require("../Models/User");

const signInController = async (req, res) => {
    if (req.body.googleAccessToken) {
        // google oauth login
        axios
            .get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
                headers: {
                    Authorization: `Bearer ${req.body.googleAccessToken}`,
                },
            })
            .then(async response => {
                const firstName = response.data.given_name;
                const lastName = response.data.family_name;
                const email = response.data.email;

                const alreadyExistingUser = await User.findOne({ email });

                if (alreadyExistingUser) {
                    const token = alreadyExistingUser.generateAuthToken();

                    res.status(200).json({ result: alreadyExistingUser, token });
                }

                const result = await User.create({ firstName, lastName, email });

                const token = result.generateAuthToken();

                res.status(200).json({ result, token });
            })
            .catch(err => {
                res.status(400).json({ message: err.message });
            });
    } else {
        // email and password login
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw new Error("Email and password are required!");
            }

            const alreadyExistingUser = await User.findOne({ email });

            if (!alreadyExistingUser) {
                throw new Error("User doesn't exist!");
            }

            const isPasswordCorrect = await bcrypt.compare(password, alreadyExistingUser.password);

            if (!isPasswordCorrect) {
                throw new Error("Invalid Password!");
            }

            const token = alreadyExistingUser.generateAuthToken();

            res.cookie("authToken", token).status(200).json({ result: alreadyExistingUser, token });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
};

const signUpController = async (req, res) => {
    if (req.body.googleAccessToken) {
        // google oauth
        axios
            .get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
                headers: {
                    Authorization: `Bearer ${req.body.googleAccessToken}`,
                },
            })
            .then(async response => {
                const firstName = response.data.given_name;
                const lastName = response.data.family_name;
                const email = response.data.email;

                const alreadyExistingUser = await User.findOne({ email });

                if (alreadyExistingUser) {
                    const token = alreadyExistingUser.generateAuthToken();

                    res.status(200).json({ result: alreadyExistingUser, token });
                }

                const result = await User.create({ firstName, lastName, email });

                const token = result.generateAuthToken();

                res.status(200).json({ result, token });
            })
            .catch(err => {
                res.status(400).json({ message: err.message });
            });
    } else {
        // normal auth with email and password
        const { email, firstName, lastName, password } = req.body;
        try {
            if (!email || !firstName || !lastName || !password) {
                throw new Error("Insufficient fields!");
            }

            const alreadyExistingUser = await User.findOne({ email });

            if (alreadyExistingUser) {
                throw new Error("User already exists!");
            }

            const hashedPassword = await bcrypt.hash(password, 8);

            const result = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });

            const token = result.generateAuthToken();

            res.cookie("authToken", token).status(200).json({ result, token });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
};

const meController = async (req, res) => {
    try {
        if (req.user) res.status(200).json({ result: req.user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
module.exports = { signInController, signUpController, meController };
