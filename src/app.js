const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { connectDB } = require("./db/mongoose");
const userRouter = require("./routers/user");
const app = express();

dotenv.config();

connectDB();

app.use(helmet());

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", userRouter);

module.exports = app;
