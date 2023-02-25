const app = require("./app");

const PORT = process.env.PORT || 6000;

app.listen(PORT, function () {
  console.log(`Express app listening on port ${PORT}`);
});
