const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { connectDB } = require("./db/mongoose");
const userRouter = require("./routers/user");
const app = express();

dotenv.config();

const corsOptions = {
    credentials: true,
    origin: true,
    allowedHeaders: "content-type, origin, accept,",
    methods: "GET,POST,PUT",
};

app.use(cors(corsOptions));
app.use(helmet());

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectDB();

app.use("/user", userRouter);

module.exports = app;
