const mongoose = require("mongoose");

const connectDB = () => {
  try {
    const mongoString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster.6llo7lr.mongodb.net/TaskPlanner?retryWrites=true&w=majority`;
    mongoose.set("strictQuery", false);
    mongoose
      .connect(mongoString)
      .then(() => console.log("Connected to MongoDB database."));
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };
