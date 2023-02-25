const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { connectDB } = require("./db/mongoose");

dotenv.config();

const app = express();

connectDB();

app.use(helmet());

app.use(
    cors({
        origin: process.env.NODE_ENV === "development" ? "*" : /domain\.com$/,
    }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;
