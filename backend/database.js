const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((db) => console.log("Database is connected"))
  .catch((error) => console.error(error));

module.exports = connection;
