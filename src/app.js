const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { connectDB } = require("./db/mongoose");
const userRouter = require("./routers/User");
const taskRouter = require("./routers/Tasks");
const app = express();

dotenv.config();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
const corsOptions = {
    credentials: true,
    origin: true,
    allowedHeaders: "content-type, origin, accept,",
    methods: "GET,POST,PUT",
};
app.use(cors(corsOptions));

connectDB();

// Routes
app.use("/user", userRouter);
app.use("/task", taskRouter);

module.exports = app;
