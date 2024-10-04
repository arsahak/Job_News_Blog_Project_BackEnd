const express = require("express");
const cors = require("cors");
require("./config/db");
const userRouter = require("./routes/routeNames");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", userRouter);

// Database connection

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/./views/index.html");
});

// route not found error
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});

//handling server error
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "something broke",
  });
});

module.exports = app;
