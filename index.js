const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 6000;

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.NODE_ENV === "development" ? "*" : /domain\.com$/,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, function () {
  console.log(`Express app listening on port ${PORT}`);
});
