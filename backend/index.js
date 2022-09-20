const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const { connection } = require("./database");

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
//app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", cors(), require("./routes/routes"));


// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on http://localhost:${app.get("port")}`);
});
